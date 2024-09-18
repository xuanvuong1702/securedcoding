import React, { useCallback, useMemo, useRef, useState } from 'react'
import './OverviewTab.css'
import { Button, Typography } from 'antd'
import InfoIcon from '@mui/icons-material/Info';
import { PrinterOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import TimeLineHorizontal from './TimeLineHorizontal';
import { fakeDatabarOverviewTab, fakeDatascatterOverviewTab, fakeDatayAxisOverviewTab } from '../../../../../constant/constants';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

const OverviewTab = () => {
  const [chartType, setChartType] = useState('scatter');
  const reportChart = useRef(null);

  const tooltipFormatter = useCallback((params) => {
    let content;

    switch (chartType) {
      case 'scatter':
        content = [
          `<b>Case:</b> ${params.seriesName}<br/>`,
          `<b>Date:</b> ${params.name}<br/>`,
          `<b>Award Amount:</b> $${params.data[0] * 1000}.00<br/>`,
          `<b>Injuries:</b> Fracture of nasal septum<br/>`,
          `<b>Level 1:</b> Head<br/>`,
          `<b>Level 2:</b> Nose and Smell<br/>`,
          `<b>Level 3:</b> Fracture of Sinus<br/>`
        ];
        break;

      case 'bar':
        content = [
          `<b>Case:</b> ${params.seriesName}<br/>`,
          `<b>Date:</b> ${params.name}<br/>`,
          `<b>Award Amount:</b> $${params.data * 1000}.00<br/>`,
          `<b>Injuries:</b> Fracture of nasal septum<br/>`,
          `<b>Level 1:</b> Head<br/>`,
          `<b>Level 2:</b> Nose and Smell<br/>`,
          `<b>Level 3:</b> Fracture of Sinus<br/>`
        ];
        break;

      default:
        content = [
          `<b>Case:</b> ${params.seriesName}<br/>`,
          `<b>Date:</b> ${params.name}<br/>`,
          `<b>Award Amount:</b> $${params.data[0] * 1000}.00<br/>`,
          `<b>Injuries:</b> Fracture of nasal septum<br/>`,
          `<b>Level 1:</b> Head<br/>`,
          `<b>Level 2:</b> Nose and Smell<br/>`,
          `<b>Level 3:</b> Fracture of Sinus<br/>`
        ];
    }
    return content;
  }, [chartType]);

  const option = useMemo(() => {
    return {
      title: {
        subtext: "Pain and Suffering Award Amounts of Past Cases",
        left: "center",
        subtextStyle: {
          fontSize: 20
        }
      },
      xAxis: [
        {
          type: 'category',
          name: 'Assessment Date',
          nameLocation: 'center',
          nameGap: 40,
          nameTextStyle: {
            fontSize: 16
          },
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          // prettier-ignore
          data: fakeDatayAxisOverviewTab,
        }
      ],
      yAxis: {
        name: 'Award Amount (k$)',
        type: 'value',
        nameLocation: 'center',
        nameGap: 40,
        nameTextStyle: {
          fontSize: 16
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: { show: true }
        }
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'cross'
        },
        formatter: function (params) {
          return tooltipFormatter(params).join('');
        }
      },
      legend: {
        left: 80,
        bottom: 10,
        type: 'scroll',
        selected: { detail: false },
      },
      series: [
        {
          name: 'Injury',
          symbolSize: 20,
          data: chartType === 'scatter' ? fakeDatascatterOverviewTab : fakeDatabarOverviewTab,
          type: chartType,
          color: '#751c24',
        }
      ]
    };
  }, [chartType, tooltipFormatter]);

  const handleGeneratePdf = async () => {
    const doc = new jsPDF({
      orientation: 'l', // landscape
      unit: 'pt', // points, pixels won't work properly
      // format: [canvas.width, canvas.height]
    });

    const options = {
      scale: 2, // Adjust the scale factor as needed
      useCORS: true, // Enable CORS if exporting images from external sources
      scrollX: 0,
      scrollY: 0,
      width: reportChart.current.offsetWidth,
      height: reportChart.current.offsetHeight
    };

    try {
      const canvas = await html2canvas(reportChart.current, options);

      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);

      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;

      const marginLeft = (pdfWidth - imgWidth) / 2;
      const marginTop = (pdfHeight - imgHeight) / 2;

      doc.addImage(imgData, 'PNG', marginLeft === 0 ? 20 : marginLeft, marginTop, imgWidth, imgHeight);
      doc.save(`Pain and Suffering Award Amounts of Past Cases (${chartType} chart).pdf`);
    } catch (error) {
      console.log('Error exporting to PDF:', error);
    }
  };

  return (
    <div
      className='overview-tab-container'
    >
      <div
        className='overview-tab-title'
      >
        <Typography.Text>
          <InfoIcon sx={{ mr: 1, fontSize: '20px' }} />
          <b>14</b> injuries found in <b>14</b> cases (excludes global awards)
        </Typography.Text>
        <Button
          className='overview-tab-print-btn'
          onClick={handleGeneratePdf}
        >
          <PrinterOutlined />
          Print Overview
        </Button>
      </div>

      <div
        ref={reportChart}
      >
        {/* Time line */}
        <div>
          <TimeLineHorizontal />
        </div>

        {/* React Chart */}
        <div className='overview-tab-chart-container'
        >
          <ReactECharts
            option={option}
            style={{ height: '600px', width: '100%' }}
          />
        </div>
      </div>
      {/* Control Box */}
      <div>
        <Button
          onClick={() => setChartType('scatter')}
          disabled={chartType === 'scatter'}
          style={{
            fontWeight: chartType === 'scatter' ? 'bold' : '',
            marginRight: '8px'
          }}
        >
          Scatter Plot
        </Button>
        <Button
          onClick={() => setChartType('bar')}
          disabled={chartType === 'bar'}
          style={{
            fontWeight: chartType === 'bar' ? 'bold' : '',
          }}
        >
          Bar Chart
        </Button>
      </div>
    </div>
  )
}

export default OverviewTab