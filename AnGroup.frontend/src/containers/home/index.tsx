import { Col, Row, Spin } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  LabelList,
  Label,
  ResponsiveContainer,
} from 'recharts'
import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'
import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { DashboardServices } from '~/services/dashboardservice'
import { SelectBox } from '~/components/common'

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props

  return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />
}

const colors = {
  DRAFT: '#FF9898',
  DATACHECK: '#8268DF',
  ASSESSMENT: '#789CFF',
  APPROVED: '#11D028',
  APPROVAL: '#01BCAD',
  DEFER: '#FF6868',
  DECLINED: '#FFA900',
  AI_NON_PROCESS_AFTER_APPROVAL: '#D2D2D2',

  DISBURSEMENT: '#FF91BF',

  AI_EXECUTION: '#11D028',
  AI_REJECT: '#D2D2D2',
  AI_CANCEL: '#D2D2D2'

  // '#FF9898',
  // '#8268DF',
  // '#789CFF',
  // '#01BCAD',
  // '#FF6868',
  // '#FFA900',
  // '#FF91BF'
}

export const HomeContainer: React.FC<any> = () => {
  const { t } = useAppTranslation()
  const [funnelChart, setFunnelChart] = useState([])
  const [lineChart, setLineChart] = useState([])
  const [barChart, setBarChart] = useState([])

  const [period, setPeriod] = useState<number>(30)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const res = await DashboardServices.search({ params: { period: period } })
    if (res?.data?.data?.barChart?.length > 0) {
      (res?.data?.data?.barChart as Array<any>).forEach((item) => {
        const barCharResult = { name: 'Status' }
        item?.chartInfo?.barChart?.data?.forEach((x: any) => {
          barCharResult[x?.name] = x?.value
        })
        item.chartInfo.barCharResult = barCharResult
      })
    }
    setIsLoading(false)
    setFunnelChart(res?.data?.data?.funnelChart)
    setLineChart(res?.data?.data?.lineChart)
    setBarChart(res?.data?.data?.barChart)
  }, [setIsLoading, setFunnelChart, setLineChart, setBarChart, period])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handlePeriodChange = (value: number) => {
    setPeriod(value)
  }
  const getTitle = () => {
    if (period === -1) return 'All'
    if (period === 0) return 'Today'
    return `${period} Days`
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-80">
          <Spin size="default"></Spin>
        </div>
      ) : (
        <div>
          <PaperPageHeaderForList title={t('dashboard.title')} />
          <div className="bg-white pt-3 px-4 mb-6">
            <SelectBox
              defaultValue={period}
              onChange={handlePeriodChange}
              options={[
                { label: 'Hôm nay', value: 0 },
                { label: 'Hôm qua', value: 1 },
                { label: '7 ngày trước', value: 7 },
                { label: '14 ngày trước', value: 14 },
                { label: '30 ngày trước', value: 30 },
                { label: '1 năm trước', value: 365 },
                { label: 'All', value: -1 },
              ]}
            />
          </div>
          <Row>
            <Col span={16} className="mt-4">
              <div className="grid justify-center">
                <span className="flex justify-center text-3xl font-black text-blue-900">{getTitle()}</span>
                <span className="font-black text-blue-900">AVERAGE SALES CYCLE LENGTH</span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={lineChart}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" interval="preserveStartEnd" height={80} />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Line type="monotone" dataKey="average" stroke="#6579b7" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="p-16">
                <div className="grid justify-center">
                  <span className="font-black text-2xl text-blue-900">Sale Funnel</span>
                </div>
                <div className="pt-5">
                  <FunnelChart
                    data={funnelChart}
                    // title={'Sale Funnel'}
                    pallette={['#FF9898', '#8268DF', '#789CFF', '#11D028', '#FF6868', '#FFA900', '#D2D2D2', '#FF91BF', '#11D028', '#D2D2D2', '#D2D2D2']}
                  />
                </div>
              </div>
            </Col>
            <Col span={8} className="pr-8 pl-8">
              {barChart?.length > 0 &&
                barChart.map((item) => {
                  // const newDataBarChart = {}
                  // for (const [key, value] of Object.entries(item?.chartInfo?.barCharResult)) {
                  //   if(value > 0) {
                  //     newDataBarChart[key] = value
                  //   }
                  // }

                  return item?.chartInfo?.lineChart?.length > 0 ? (
                    <Row>
                      <Col span={24}>
                        <div className="grid">
                          <span className="font-black text-blue-900 text-xl">{item?.officeInfo?.name}</span>
                        </div>
                        <ResponsiveContainer width="100%" height={100}>
                          <LineChart data={item?.chartInfo?.lineChart}>
                            <Line type="monotone" dataKey="average" stroke="#8884d8" strokeWidth={1} />
                          </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-between">
                          <span className="font-black text-blue-900">Sale Cycle Length</span>
                          <span className="font-black text-blue-900">{getTitle()}</span>
                        </div>
                        <ResponsiveContainer width="100%" height={70}>
                          <BarChart
                            data={[{ ...item?.chartInfo?.barCharResult }]}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type={'number'} hide domain={['dataMin', 'dataMax']} />
                            <YAxis dataKey="axis" type={'category'} axisLine={false} tickLine={false} hide />
                            <Tooltip wrapperStyle={{ zIndex: 1000 }} />
                            {Object.keys(item?.chartInfo?.barCharResult)
                              ?.slice(1)
                              ?.map((key: string, index: number): any => {
                                const bars = []
                                bars.push(
                                  <Bar
                                    dataKey={key}
                                    stackId="a"
                                    fill={colors[key]}
                                    // label={{ position: 'inside' }}
                                  >
                                    <LabelList dataKey={key} position="center" content={renderCustomizedLabel} />
                                  </Bar>,
                                )
                                // /* Add a bar just for the gap after each bar */
                                return bars
                              })}
                          </BarChart>
                        </ResponsiveContainer>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )
                })}
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}
