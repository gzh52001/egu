import React, { Component } from 'react'
import { Button,Upload } from 'antd';
import { DatePicker, List,Picker,Modal,Toast } from 'antd-mobile';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Pop from '@/page/Bubble/bubble'
import userApi from '@/api/user'
import './style.scss'

const prompt = Modal.prompt;
const dateNow = new Date(Date.now());
const id =localStorage.getItem('egu_userId')


class User extends Component {
  state = {
    date:dateNow,
    sex: [
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
      {
        label: '保密',
        value: '保密',
      },
    ],
    currentSex:['女'],
    currentTel:['13564865880'],
    curUsername:localStorage.getItem('egu_username'),
    curAvatar:localStorage.getItem('egu_avatar')
  }

  jumpRout(rout) {
    this.props.history.push(rout);
  }

  handleChange=(info)=>{
    if (info.file.status !== 'uploading') {
      // console.log(info.file.response.data, info.fileList);
    }
    if (info.file.status === 'done') {
      // console.log(info.file.response)
      localStorage.setItem('egu_avatar',info.file.response.data.imgurl)
      this.setState({curAvatar:info.file.response.data.imgurl})
      Toast.info('修改成功')
    } else if (info.file.status === 'error') {
      Toast.info('修改失败')
    }
  }

  changeUsername=async (val)=>{
    console.log(val)
    let res =await userApi.checkname(val)
    console.log(res)
  }
  


  render() {
    const { sex,date,currentSex,currentTel,curUsername,curAvatar } = this.state;
    return (
      <div className='user'>

        {/* 头部 */}
        <header>
          <div className='navLift' onClick={this.jumpRout.bind(this, '/mine')}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
          <div className='navTitle'>个人信息</div>
          <div className='navRight'>
            <Pop />
          </div>
        </header>

        {/* 内容区 */}
        <div style={{width:'100%',height:'260px',background:'#fff'}}>
          <ul>
            <li style={{ height: '76px' }}>
              
                <span style={{ lineHeight: '76px',float:'left' }}>
                  头 像
                </span>
                <RightOutlined style={{ color:'#bbb', marginTop: '28px',fontSize:18,float:'right',paddingRight:13 }} />
                <span style={{width:70, height:70,float:'right',overflow:'hidden',borderRadius:'50%',marginTop:2}}>
                  <Upload 
                   name='avatar'
                   action='/api/upload/touxiang'
                   data={ {id:id} }
                   onChange={this.handleChange}>
                    <img alt='' src={curAvatar} />
                  </Upload>
                </span>
             
            </li>

            <li onClick={() => prompt('修改用户名', '',  [
                { text: '取消' },
                { text: '确认', callbackOrActions: async (val)=>{
                    let res=await userApi.checkname(val)
                    console.log(res);
                } },
              ], 'default', '100')}>
              <span style={{float:'left'}}>
                <span>用户</span>
                <span className="user-text">{curUsername}</span>
              </span>
              <RightOutlined style={{ color: '#bbb', marginTop: '14px',fontSize:18,float:'right' ,paddingRight:13}} />
            </li>

            <li onClick={() => prompt('请输入手机号', '',  [
                { text: '取消' },
                { text: '确认', onPress: value => console.log(`输入的内容:${value}`) },
              ], 'default', '100')}>
              <span style={{float:'left'}}>
                <span>手机号</span>
                <span className="user-text" style={{width:283}}>{currentTel[0]}</span>
              </span>
              <RightOutlined style={{ color: '#bbb', marginTop: '14px',fontSize:18,float:'right' ,paddingRight:13}} />
            </li>

             <Picker 
              data={sex}
              cols={1} 
              value={currentSex}
              onChange={value=>{
                console.log(value)
                this.setState({currentSex:value})
                }  
              } >
              <List.Item arrow="horizontal">性别</List.Item>
            </Picker>

            <DatePicker
              mode="date"
              extra="Optional"
              value={date}
              onChange={date => {
                console.log(date)
                this.setState({ date })
              }}
            >
              <List.Item arrow="horizontal">出生日期</List.Item>
          </DatePicker>

          </ul>
        </div> 
        <Button style={{ background: 'rgb(241, 109, 20)', color: '#fff' }} className="button">退出登录</Button>
      </div>
    )
  }
}

export default User;