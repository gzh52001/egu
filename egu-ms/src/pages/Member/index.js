import React, { Component } from 'react';
import { Card,Input,Button,Table,Popconfirm,message,Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import memberApi from '@/api/member';

const imgUrl = 'http://120.25.242.86:8000/'
export default class Member extends Component {
    state={
        columns:[{ // 表头数据
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 60,
                align:'center'
              },
              {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: 150,
                align:'center'
              },
              {
                title: '头像',
                dataIndex: 'avatarurl',
                key: 'avatarurl',
                width: 150,
                align:'center',
                render:(text)=>(text?<img src={imgUrl+text} alt='' width={70} height={60} />:'')
              },
              {
                title: '手机号码',
                dataIndex: 'tel',
                key: 'tel',
                // align:'center'
              },{
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                align:'center'
              }, {
                title: '出生日期',
                dataIndex: 'birthday',
                key: 'birthday',
                align:'center'
              },{
                  title:'操作',
                  dataIndex:'action',
                  key: 'action',
                  align:'center',
                  render: (text, record) => (
                    <>
                        {this.state.data.length >= 1 ? (
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record)}>
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    ) : null}
                            
                    </>
                  ),
               
              }],
        data:[],
        searchVal:'',
        total:''
        }
        // 删除 
        handleDelete=async (val)=>{
          let res =await memberApi.delUserById(val.id)
          if(res.status){
            // 删除成功
            message.success('删除成功');
            this.getMemberList();
          }else{
            message.success('删除失败')
          }
         
        }

        // 获取数据
        getMemberList=async ()=>{
          let res = await memberApi.getMenberData()
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              let birthday=''
              if(res.data[i].birthday){
                birthday = (new Date(res.data[i].birthday)).toLocaleDateString()
              }
                arr.push({
                  key:i,
                  id:res.data[i].id,
                  username: res.data[i].username,
                  tel: res.data[i].tel,
                  sex: res.data[i].sex,
                  birthday:birthday,
                  avatarurl:res.data[i].avatarurl
                });
              }
              this.setState({data:arr,total:res.data.length})
        }

        // 分页查询
        getPageSizeInfo=async(page=1)=>{
          let res = await memberApi.getInfoByPageAndSize(page);
          if(res.status){
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              let birthday=''
              if(res.data[i].birthday){
                birthday = (new Date(res.data[i].birthday)).toLocaleDateString()
              }
                arr.push({
                  key:i,
                  id:res.data[i].id,
                  username: res.data[i].username,
                  tel: res.data[i].tel,
                  sex: res.data[i].sex,
                  birthday:birthday,
                  avatarurl:res.data[i].avatarurl
                });
              }
              this.setState({data:arr,total:res.total})
          }else{
            message.success('获取数据失败');
          }
        }
    
        // 查询用户
        searchInfo=async ()=>{
          let {searchVal} = this.state;
          let res = await memberApi.getInfoById(searchVal);
          if(res.status){
            message.success('查询成功')
            let birthday= (new Date(res.data[0].birthday)).toLocaleDateString()
            this.setState({data:[{...res.data[0],birthday,key:1}]})
           
          }else{
            message.warning('用户不存在');
          }
        }

        changeSize=(page)=>{
          this.getPageSizeInfo(page)
        }

        componentDidMount(){
          // this.getMemberList();
          this.getPageSizeInfo()
        }

    render() {
        let {columns,data,total} =this.state;
        return (
            <div className="member">
                 <Card style={{ width: '100%' }}>
                    <Input placeholder="请输入用户名" defaultValue="123" style ={{width:220,marginRight:20}} onChange={(e)=>this.setState({searchVal:e.currentTarget.value})}/>
                    <Button type="primary" icon={<SearchOutlined />} onClick={this.searchInfo}>
                       查询
                    </Button>
                    <Button type="primary" style={{marginLeft:10}} icon={<SearchOutlined /> } onClick={this.getPageSizeInfo.bind(null,1)}>
                       全部
                    </Button>
                </Card>

                <Table columns={columns} dataSource={data} bordered 
                  pagination={{ 
                    defaultCurrent:1, 
                    total,
                    pageSize:5,
                    onChange:this.changeSize 
                  }} 
                  scroll={{ y: 370 }} />
            </div>
        )
    }
}
