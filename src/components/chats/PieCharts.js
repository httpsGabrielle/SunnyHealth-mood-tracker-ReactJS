import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------

export default function PieCharts({data}) {

  
  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

  function TextArea({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <>
        <StyledText x={left + width / 2} y={top + height / 2.5} sx={{fontWeight: 800}}>
          {data[1]?.value !== 0 ? (data[0]?.value / data[1]?.value) * 100 : '100'}%
        </StyledText>
        <StyledText x={left + width / 2} y={top + height / 1.9} sx={{fontSize: 14}}>
          {children}
        </StyledText>
      </>
    );
  }

  return (
    <Stack direction="row">
      <PieChart
        series={[
          {
            innerRadius: 67,
            outerRadius: 99,
            paddingAngle: 4,
            cornerRadius: 100,
            startAngle: -180,
            border: 'none',
            data,
          },
        ]}
        margin={{ right: 5 }}
        width={200}
        height={200}
        legend={{ hidden: true }}
      >
        <TextArea>
          Completas  
        </TextArea>
      </PieChart>
    </Stack>
  );
}
