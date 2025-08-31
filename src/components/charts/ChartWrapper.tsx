import React from 'react';
import { Box, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartWrapperProps {
  options: Highcharts.Options;
  title?: string;
  height?: string | number;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ options, title, height = 400 }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Default theme for charts with mobile-first approach
  const defaultOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      spacing: isMobile ? [10, 10, 10, 10] : [15, 15, 15, 15],
      height: height,
    },
    title: {
      style: {
        color: textColor,
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '600',
      },
      margin: isMobile ? 10 : 15,
    },
    xAxis: {
      labels: {
        style: {
          color: textColor,
          fontSize: isMobile ? '11px' : '12px',
        },
        rotation: isMobile ? -45 : 0,
      },
      lineColor: useColorModeValue('#e2e8f0', '#4a5568'),
      tickColor: useColorModeValue('#e2e8f0', '#4a5568'),
    },
    yAxis: {
      labels: {
        style: {
          color: textColor,
          fontSize: isMobile ? '11px' : '12px',
        },
      },
      gridLineColor: useColorModeValue('#e2e8f0', '#4a5568'),
      title: {
        style: {
          color: textColor,
          fontSize: isMobile ? '11px' : '12px',
        },
      },
    },
    legend: {
      itemStyle: {
        color: textColor,
        fontSize: isMobile ? '11px' : '12px',
      },
      itemHoverStyle: {
        color: useColorModeValue('#4a5568', '#a0aec0'),
      },
      enabled: !isMobile, // Hide legend on mobile to save space
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemDistance: isMobile ? 10 : 20,
    },
    tooltip: {
      backgroundColor: bgColor,
      borderColor: useColorModeValue('#e2e8f0', '#4a5568'),
      style: {
        color: textColor,
        fontSize: isMobile ? '11px' : '12px',
      },
      useHTML: true,
      borderRadius: 8,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: !isMobile, // Disable export on mobile
      buttons: {
        contextButton: {
          theme: {
            fill: bgColor,
            stroke: useColorModeValue('#e2e8f0', '#4a5568'),
          },
        },
      },
    },
    plotOptions: {
      series: {
        animation: {
          duration: 300,
        },
      },
      column: {
        borderRadius: isMobile ? 2 : 4,
        pointPadding: isMobile ? 0.1 : 0.2,
        groupPadding: isMobile ? 0.1 : 0.2,
      },
      line: {
        marker: {
          radius: isMobile ? 3 : 4,
        },
      },
      area: {
        marker: {
          radius: isMobile ? 3 : 4,
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              enabled: false,
            },
            title: {
              style: {
                fontSize: '13px',
              },
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
            yAxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
          },
        },
        {
          condition: {
            minWidth: 501,
            maxWidth: 768,
          },
          chartOptions: {
            legend: {
              enabled: true,
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          },
        },
      ],
    },
  };

  const mergedOptions = Highcharts.merge(defaultOptions, options);

  return (
    <Box
      bg={bgColor}
      borderRadius={{ base: 'lg', md: 'xl' }}
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
      p={{ base: 3, md: 6 }}
      h={height}
      overflow="hidden"
    >
      {title && (
        <Box mb={{ base: 3, md: 4 }}>
          <Box
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="semibold"
            color={textColor}
            mb={2}
            textAlign={{ base: 'center', md: 'left' }}
          >
            {title}
          </Box>
        </Box>
      )}
      <Box 
        h="calc(100% - 60px)" 
        overflow="hidden"
        borderRadius="md"
      >
        <HighchartsReact 
          highcharts={Highcharts} 
          options={mergedOptions}
          containerProps={{ style: { height: '100%' } }}
        />
      </Box>
    </Box>
  );
};

export default ChartWrapper;
