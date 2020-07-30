import React, { Component } from 'react'
import { Table, Card,Input, Button, Popconfirm, Modal,notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import dataSource from './data'
import UpdateModals from './updateModal'
import AddModals from './addModal'
import goodsApi from "@/api/goodsapi"

//商品管理
export default class Goods extends Component {
    state = {
        dataSource:[], //数据行渲染
        columns : [
            {
                title: '序号',
                dataIndex:'id',
                key:'id',
                width: 80,
                align:'center'
            },
            {
                title: '商品ID',
                dataIndex: 'goodsId',    //数据列表对应的列
                key: 'goodsId',
                width: 120,
                align:'center'
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
                width: 200,
                align:'center'
            },
            {
                title: '图片',
                key: 'goodsImg',
                dataIndex: 'goodsImg',
                render:(text)=>(<img src={text} alt='' width={70} height={60}/>)
                ,width: 100,
                align:'center'
            },
            {
                title: '描述',
                dataIndex: 'param2',
                key: 'param2',
                width: 250,
                align:'center'
            },
            {
                title: '价格',
                dataIndex:'retailPrice',
                key: 'retailPrice',
                width: 120,
                align:'center'
            },
            {
                title: '数量',
                dataIndex:'num',
                key: 'num',
                width: 100,
                align:'center'
            },
            {
                title: '操作',
                dataIndex:'action',
                key: 'action',
                align:'center',
                render: (text,record) => this.state.dataSource.length >= 1 ? (   //record: 当前渲染的数据
                    <>
                        {/* 给弹窗组件传参 */}
                        <UpdateModals details={record} getData={this.getData}/>

                        <Popconfirm title="确定要删除?" onConfirm={() => this.handleDelete(record)}>
                            <Button type="primary" style={{ marginLeft: '20px', background: 'red', border: 'none' }}>
                                删除
                            </Button>
                        </Popconfirm>
                    </>
                ) : null,
            },
        ],
        toatl:'',
        searchVal:''
    };

    //删除操作的方法
    handleDelete =async val => {
        console.log(val.id);
        let res = await goodsApi.delGoods(val.id);
    
        if(res.flag){
            notification.open({
              message: '删除成功',
              description:
              "数据删除成功"
            });
            this.getData();
          }else{
            notification.open({
              message: '删除失败',
              description:
              "数据删除失败"
            });
          }
          console.log(res);
    };
    getData= async ()=>{
        let res = await goodsApi.getGoods();
        console.log(res);
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
         
            arr.push({
              key:i,
              id:i+1,
              goodsId: res.data[i].goodsId,
              goodsName: res.data[i].goodsName,
              goodsImg: res.data[i].goodsImg,
              param2:res.data[i].param2,
              retailPrice:res.data[i].retailPrice,
              num:res.data[i].num
            });
          }
          this.setState({dataSource:arr,toatl:res.data.length})

    }

    searchInfo=async ()=>{
        if(this.state.searchVal !== ''){
            let res = await goodsApi.searchgGoods(this.state.searchVal);
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
                arr.push({
                  key:i,
                  id:i+1,
                  goodsId: res.data[i].goodsId,
                  goodsName: res.data[i].goodsName,
                  goodsImg: res.data[i].goodsImg,
                  param2:res.data[i].param2,
                  retailPrice:res.data[i].retailPrice,
                  num:res.data[i].num
                });
              }
            this.setState({dataSource:arr,toatl:res.data.length})
        }else{
            notification.open({
                message: '查询失败',
                description:
                "请输入查找的内容"
              });
        }
    }
    
    componentDidMount(){
        this.getData()
    }

    render() {

        /* -------列数组------- */
        const { dataSource,columns,total } = this.state;

        return (
            <div className='goods'>
                <Card style={{ width: '100%' }}>
                    <Input placeholder="请输入商品id" style ={{width:220,marginRight:20}} onChange={(e)=>this.setState({searchVal:e.currentTarget.value})}/>
                    <Button type="primary" icon={<SearchOutlined />} onClick={this.searchInfo}>
                    查询
                    </Button>
                    <AddModals getData={this.getData}/>
                   
                </Card>
                <Table scroll={{ y: 370 }}
                 columns={columns}  
                 dataSource={dataSource}
                 pagination={{ 
                    defaultCurrent:1, 
                    total,
                    pageSize:5,
                   }} 
                 />
            </div>
        )
    }
}