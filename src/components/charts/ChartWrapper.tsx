import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Import Highcharts modules
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';

// Initialize Highcharts modules
// HC_exporting(Highcharts);
// HC_exportData(Highcharts);
// HC_accessibility(Highcharts);

interface ChartWrapperProps {
  options: Highcharts.Options;
  title?: string;
  height?: string | number;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ options, title, height = 400 }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  // Default theme for charts
  const defaultOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, system-ui, sans-serif',
      },
    },
    title: {
      style: {
        color: textColor,
        fontSize: '16px',
        fontWeight: '600',
      },
    },
    xAxis: {
      labels: {
        style: {
          color: textColor,
        },
      },
      lineColor: useColorModeValue('#e2e8f0', '#4a5568'),
      tickColor: useColorModeValue('#e2e8f0', '#4a5568'),
    },
    yAxis: {
      labels: {
        style: {
          color: textColor,
        },
      },
      gridLineColor: useColorModeValue('#e2e8f0', '#4a5568'),
    },
    legend: {
      itemStyle: {
        color: textColor,
      },
      itemHoverStyle: {
        color: useColorModeValue('#4a5568', '#a0aec0'),
      },
    },
    tooltip: {
      backgroundColor: bgColor,
      borderColor: useColorModeValue('#e2e8f0', '#4a5568'),
      style: {
        color: textColor,
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          theme: {
            fill: bgColor,
            stroke: useColorModeValue('#e2e8f0', '#4a5568'),
            // states: {
            //   hover: {
            //     fill: useColorModeValue('#f7fafc', '#2d3748'),
            //   },
            // },
          },
        },
      },
    },
  };

  const mergedOptions = Highcharts.merge(defaultOptions, options);

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      boxShadow="sm"
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      p={6}
      h={height}
    >
      {title && (
        <Box mb={4}>
          <Box
            fontSize="lg"
            fontWeight="semibold"
            color={textColor}
            mb={2}
          >
            {title}
          </Box>
        </Box>
      )}
      <HighchartsReact highcharts={Highcharts} options={mergedOptions} />
    </Box>
  );
};

export default ChartWrapper;
