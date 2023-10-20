import React from 'react';
import {Box, VStack} from 'native-base';
import Cell, {CellProps} from 'src/comp/Cell';

export type CellListProps = {
  list: CellProps[];
};

const CellList = (props: CellListProps) => {
  return (
    <Box rounded="16" overflow={'hidden'}>
      <VStack
        bg={{
          linearGradient: {
            colors: ['#2a283a', 'rgba(22, 20, 31, 0.47)'],
            start: [0, 0],
            end: [0, 1],
          },
        }}>
        {props.list.map(item => {
          return (
            <Cell
              key={item.text}
              href={item.href}
              text={item.text}
              disableFilter={true}
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default CellList;
