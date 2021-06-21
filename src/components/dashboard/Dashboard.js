import React, { useState, useEffect } from 'react'
import DashboardService from './DashboardService'
import DashboardTable from './DashboardTable'

const Dashboard = () => {
  const [gitHubData, setGitHubData] = useState([])
  const [lastUpdate, setLastUpdate] = useState()
  const [loadingState, setLoadingState] = useState('loading')

  const REFRESH_RATE = 30000 //30 seconds

  // This is an alternative to using the componentDidMount() hook when using a functional component
  useEffect(() => {
    getGitHubData()
  }, [])

  // Set a 'data refresh' rate of 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getGitHubData()
    }, REFRESH_RATE)

    return () => clearInterval(interval)
  }, [])

  const getGitHubData = () => {
    DashboardService.fetchAllGitHubData().then(
      (data) => {
        setGitHubData(data)
        setLastUpdate(new Date().toLocaleTimeString())
        setLoadingState('complete')
      },
      () => {
        setLoadingState('error')
      }
    )
  }

  return (
    <div className="dashboard">
      {loadingState === 'complete' && (
        <>
          <div>
            <h3>LaunchPad Lab Coding Challenge</h3>
            <span>Last Update: </span>
            <span>{lastUpdate}</span>
          </div>
          <div>
            <h2>JS Frameworks Attributes</h2>
            <DashboardTable gitHubData={gitHubData} />
          </div>
        </>
      )}

      {loadingState === 'loading' && <div>Loading...</div>}

      {loadingState === 'error' && (
        <div>
          Error fetching GitHub Data - potentially due to API rate limits :(
        </div>
      )}
    </div>
  )
}

export default Dashboard
