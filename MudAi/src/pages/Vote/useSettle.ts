import {
  deleteStore,
  getStore,
  listenStore,
  queryListenStore,
  queryStore,
} from '@/js/firebase';
import {TVote, TVoteHistory} from '@/type';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

const useSettle = () => {
  const router = useRouter();
  const [vote, setvote] = useState<TVote>();
  const [voteHistorySubscriber, setvoteHistorySubscriber] = useState([]);
  const [result, setresult] = useState([]);

  useEffect(() => {
    if (router) {
      getStore(`vote/${router.query.id}`).then(res => {
        setvote(res as TVote);
      });

      const voteHistorySubscriber = queryListenStore(
        `vote/${router.query.id}/history`,
        setvoteHistorySubscriber,
      );

      return () => {
        voteHistorySubscriber();
      };
    }
  }, [router]);

  useEffect(() => {
    if (voteHistorySubscriber && voteHistorySubscriber.length > 0 && vote) {
      settleVote();
    }
  }, [voteHistorySubscriber, vote]);

  const settleVote = () => {
    // 回答のamountを集計
    const voteAmounts: {
      [key: string]: number;
    } = {};
    voteHistorySubscriber.forEach((item: TVoteHistory) => {
      if (item.choice in voteAmounts) {
        voteAmounts[item.choice] += item.amount;
      } else {
        voteAmounts[item.choice] = item.amount;
      }
    });

    const answer = Object.keys(voteAmounts).reduce((a, b) => {
      return voteAmounts[a] > voteAmounts[b] ? a : b;
    });

    // 不正解のhistoryの配列
    const incorrects = voteHistorySubscriber.filter((item: TVoteHistory) => {
      return String(item.choice) !== answer;
    });

    const lostSumArr = Object.values(
      incorrects.reduce((acc, {uid, amount}) => {
        acc[uid] = acc[uid] || {uid, amount: 0};
        acc[uid].amount += amount;
        return acc;
      }, {}),
    );

    // 不正解の合計値
    const incorrectTotal = incorrects.reduce((prev, current) => {
      return prev + current.amount;
    }, 0);

    // 正解のhistoryの配列
    const corrects = voteHistorySubscriber.filter((item: TVoteHistory) => {
      return String(item.choice) === answer;
    });

    // 同じuidのものを合算
    const resultArray = Object.values(
      corrects.reduce((acc, {uid, amount}) => {
        acc[uid] = acc[uid] || {uid, amount: 0};
        acc[uid].amount += amount;
        return acc;
      }, {}),
    );

    const share = incorrectTotal / (resultArray.length + 1);

    let result = resultArray.map(item => {
      const lost = lostSumArr.find(lost => lost.uid === item.uid)?.amount || 0;
      return {
        // 運営者を含めるために +1
        uid: item.uid,
        back: item.amount,
        share,
        lost,
        result: 100 + share - lost,
      };
    });
    result = result.sort((a, b) => a.uid.localeCompare(b.uid));

    result.push({
      uid: 'admin',
      back: 0,
      share: share,
      lost: 0,
      result: share,
    });
    setresult(result);
  };

  const resetVote = () => {
    queryStore(`vote/${router.query.id}/history`).then(res => {
      res.forEach(item => {
        deleteStore(`vote/${router.query.id}/history/${item.id}`);
      });
    });
  };

  return {resetVote, result};
};

export default useSettle;
