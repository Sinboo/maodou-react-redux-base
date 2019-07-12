import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Helmet from 'components/Helmet'
import Loading from 'components/common/Loading'
import Navbar from '../../components/course/Navbar'
import ActionBar from '../../components/course/ActionBar'
import Detail from '../../components/course/Detail'
import fetchData from '../../actions/fetchData'
import { actionShowCourse, setCourseId } from '../../actions/course'

const ChatsContainer = lazy(() => import('./Chat'))
const MainSection = lazy(() => import('./MainSection'))

class CourseContainer extends Component {
  state = {
    currentTab: 'chat',
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props
    const courseId = params.id
    this.props.setCourseId(courseId)
    this.props.fetchData(actionShowCourse(courseId))
  }

  componentWillUnmount() {
    this.props.setCourseId('')
  }

  handleNavBar(value) {
    this.setState({ currentTab: value })
  }

  handleReload() {
    window.location.reload()
  }

  render() {
    const { currentTab } = this.state
    const { course } = this.props

    return (
      <div style={styles.wrap}>
        <Helmet title={course.name || '加载中'} />
        <Suspense fallback={<Loading />}>
          <MainSection course={course} />
        </Suspense>
        <Navbar currentTab={currentTab} handleNavBar={this.handleNavBar.bind(this)} />
        <Suspense fallback={<Loading />}>
          {currentTab === 'chat' ? <ChatsContainer /> : null}
        </Suspense>
        {currentTab === 'info' ? <Detail course={course} /> : null}
        <ActionBar reloadPage={this.handleReload.bind(this)} />
      </div>
    )
  }
}

const styles = {
  wrap: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
}

const mapStateToProps = state => {
  const { course } = state
  return { course: course.courseInfo }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchData, setCourseId }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseContainer)
