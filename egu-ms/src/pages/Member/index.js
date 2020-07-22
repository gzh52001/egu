import React, { Component } from 'react';
import { Card,Input,Button,Table,Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default class Member extends Component {
    state={
        columns:[{ // 表头数据
                title: 'id',
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
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel',
                align:'center'
              },{
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                align:'center'
              }, {
                title: '出生日期',
                dataIndex: 'brithday',
                key: 'brithday',
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
            data:[]
        }

        // 删除 
        handleDelete=(key)=>{
            console.log(key)
        }

        componentDidMount(){
            let arr = []
            for (let i = 0; i < 10; i++) {
                arr.push({
                  key:i,
                  id:i,
                  username: `Edward King ${i}`,
                  tel: 32,
                  sex: '男',
                  brithday:'2020-20-20'
                });
              }
                this.setState({data:arr})
        }

    render() {
        let {columns,data} =this.state
        return (
            <div className="member">
                 <Card style={{ width: '100%' }}>
                    <Input placeholder="请输入用户名"  style ={{width:220,marginRight:20}}/>
                    <Button type="primary" icon={<SearchOutlined />}>
                       查询
                    </Button>
                </Card>

                <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
            </div>
        )
    }
}
