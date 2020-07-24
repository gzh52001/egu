import React, { Component } from 'react'
import { Button,Upload,Modal,Input } from 'antd';
import { DatePicker, List,Picker,Toast } from 'antd-mobile';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Pop from '@/page/Bubble/bubble'
import userApi from '@/api/user'
import './style.scss'

const prompt = Modal.prompt;
const id =localStorage.getItem('egu_userId')

class User extends Component {
  state = {
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
    date:'',
    currentSex:[],
    currentTel:[],
    curUsername:'',
    curAvatar:'',
    nameVisible:false,
    telVisible:false,
    confirmLoading: false,
    userVal:'',
    telVal:''
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
   
    // if(res.status){

    // }else{
    //   Toast.info('修改失败')
    // }
  }

    getUserInfo = async ()=>{
      let res = await userApi.singerUserInfo(id);
      let {username,sex,birthday,tel,avatarurl} = res.data[0];
      birthday = new Date(birthday)
      if(res.status){
        this.setState({
          curUsername:username,
          currentSex:[sex],
          date:birthday,
          currentTel:[tel],
          curAvatar:avatarurl
        })
      }else{
        Toast.info('查询用户信息失败');
      }
    }

    nameHandleOk=async (e)=>{
      this.setState({confirmLoading:true})
      let res =await userApi.CheckNameIsExist(this.state.userVal);
      if(res.status){
        // 修改用户
        let res1 = await userApi.editUsername(id,this.state.userVal)
        if(res1.status){
          this.setState({confirmLoading:false,nameVisible:false,curUsername:this.state.userVal})
          localStorage.setItem('egu_username',this.state.userVal);
          Toast.info('修改成功')
        }
      }else{
        Toast.info('用户已存在')
      }
    }

    // 关闭修改用户名模态框
    nameHandleCancel=()=>{
      this.setState({nameVisible:false})
    }

    telHandleOk=async ()=>{
      this.setState({confirmLoading:true})
      let res = await userApi.editTel(id,this.state.telVal)
      if(res.status){
        this.setState({confirmLoading:false,telVisible:false,currentTel:this.state.telVal})
        Toast.info('修改成功')
      }else{
        Toast.info(res.message)
      }
      console.log(res)
    }

    // 关闭修改电话模态框
    telHandleCancel=()=>{
      this.setState({telVisible:false})
    }

    componentDidMount(){
      this.getUserInfo()
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

            <li onClick={()=>this.setState({nameVisible:true})} >
              <span style={{float:'left'}}>
                <span>用户</span>
                <span className="user-text">{curUsername}</span>
              </span>
              <RightOutlined style={{ color: '#bbb', marginTop: '14px',fontSize:18,float:'right' ,paddingRight:13}} />
            </li>

            <li onClick={()=>this.setState({telVisible:true})}>
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
              onChange={async value=>{
                this.setState({currentSex:value})
                let res = await userApi.editSex(id,value);
                if(!res.status){Toast.info('修改失败')}
              }} >
              <List.Item arrow="horizontal">性别</List.Item>
            </Picker>

            <DatePicker
              mode="date"
              extra="Optional"
              value={date}
              onChange={async date => {
                this.setState({ date })
                console.log(date)
                let res = await userApi.editBirthday(id,date);
                if(!res.status){Toast.info('修改失败')}
              }}
            >
              <List.Item arrow="horizontal">出生日期</List.Item>
          </DatePicker>

          </ul>
        </div> 
        
        <Modal
          title="修改用户名"
          visible={this.state.nameVisible}
          onOk={this.nameHandleOk}
          onCancel={this.nameHandleCancel}
        >
          <Input placeholder="请输入用户名" onChange={e=>this.setState({userVal:e.currentTarget.value})}/>
        </Modal>

        <Modal
          title="修改电话"
          visible={this.state.telVisible}
          onOk={this.telHandleOk}
          onCancel={this.telHandleCancel}
        >
          <Input placeholder="请输入手机号" onChange={e=>this.setState({telVal:e.currentTarget.value})}/>
        </Modal>

        <Button style={{ background: 'rgb(241, 109, 20)', color: '#fff' }} className="button">退出登录</Button>
      </div>
    )
  }
}

export default User;