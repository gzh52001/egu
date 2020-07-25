import React, { Component } from 'react'
import { Card, Button, Table, Input, Tag, Tooltip, Popconfirm, message} from 'antd';
import moment from "moment";

import orderApi from "@/api/order";

let { Search } = Input; 

let goodsColumnTitle = {
  goodsId: "商品id",
  goodsName: "商品名称",
  mallPrice: "价格",
  goodsImg: "图片",
  num: "数量",
  sum: "小计"
}

export default class Order extends Component {
  constructor() {
    super();
    this. state = {
      orderList:[], // 一级表格数据
      levelOneColumns: [
        { title: '订单编号', dataIndex: 'id', key: 'id' },
        { title: '用户id', dataIndex: 'userId', key: 'userId' },
        { title: '下单时间', 
          key:'date',
          render: (record) => {
            return moment(Number(record.date)).format('YYYY年MM月DD日 HH:mm:ss'); 
          }
        },
        { title: '发货状态', 
          key: 'isSend',
          render: (record) => {
            return <>
              {
                 record.isSend ? 
                 <Tooltip title="已发货"><Tag color="success">是</Tag></Tooltip>
                 : 
                 <Tooltip title="未发货"><Tag>否</Tag></Tooltip>
              }
            </>
          }
       },
        { title:"操作",
          key: "opetation",
          render: (record) => {
            return <>
              <Popconfirm
                title="确定删除订单？"
                onConfirm={() => {this.handleDelComfirm(record)}}
                okText="确定"
                cancelText="取消"
              >
                <Button type="danger"> 删除 </Button>
              </Popconfirm>
              
              <Button 
                style={{marginLeft:10}} 
                type="primary" 
                onClick={this.handleSend.bind(this, record)}
                disabled={record.isSend}>
                  发货
              </Button>
            </>
          }
        }
      ],
      goodsList:[], // 二级表格数据
      levelTowColumns: [],
      delOrderId:"",
      searchId:"",
      page:1,
      size:6,
      total:10,
      isDelPopVisible: false
    }

    this.delList = this.delList.bind(this);
  }
   

    // 数据处理------
    // columns
    setColumnKeys(column, columnTitle) {
      let keys = Object.keys(column);
      let columns = keys.map(item => {
        if(item == "goodsImg") {
          return {
            title: "图片",
            key: "goodsImg",
            render: (record) => {
              return <div style={{display:"flex",justifyContent:"center",height:50}}>
                <img style={{height:"100%"}} src={record.goodsImg}></img>
              </div>
            }
          }
        }
        return {
          title:columnTitle[item],
          dataIndex: item,
          key: item
        }
      });
      return columns.filter(item2 => item2.title); // 清除不需要显示的项
    }

    // 事件-------
    // 查询
    handleSearch = (value) => {
      this.setState({searchId:value}, () => {
        this.searchOne();
      })
    }

    // 分页器改变
    handlePageChange = (page, size) => {
      this.setState({page, size}, () => {
        this.searchPage();
      });
    }

    // 发货
    handleSend = (record) => {
      this.sendOrder(record.id)
      console.log(record.id);
    }

    // 删除订单
    handleDelComfirm = (record) => {
      this.setState({
        delOrderId:record.id
      }, () => {
        this.delList();
      })
    }

    // 异步请求------
    // 请求订单数据：
    getOrderList = () => {
      orderApi.searchList().then(res => {
        res.forEach(item => {
          item.key = item.id;
        })
        // 获取goods数据的键
        if(res.length > 0) {
          let goodsColumn = res[0].goods[0];
          let levelTowColumns = this.setColumnKeys(goodsColumn, goodsColumnTitle);
          this.setState({
              orderList:res,
              levelTowColumns
          })
        }
       
      })
    }

    // 删除订单数据
    delList() {
        let { delOrderId } = this.state; 
        orderApi.delList(delOrderId).then(res => {
          if(res.code == 1) {
            // 提示删除成功
            message.success("删除成功");
            this.searchPage();
          } else {
            // 提示删除失败
            console.log(res);
          }
        })
    } 

    // 请求一条数据
    searchOne = async () => {
      try {
        let res = await orderApi.searchOne(this.state.searchId);
        if(res.code) {
          // 给每一行加key
          res.data.forEach(item => {
            item.key = item.id;
          })
          this.setState({orderList:res.data}); // 重新赋值表格数据
        }
      } catch(err) {
        console.log(err);
      }
    }

    // 分页器数据请求
    searchPage = async () => {
      let { page, size } = this.state;
      let data = {page, size};
      try {
        let res = await orderApi.searchPage(data);
        if(res.data) {
          res.data.forEach(item => item.key = item.id); // 加key
          // 获取goods数据的键
          let goodsColumn = res.data[0].goods[0];
          let levelTowColumns = this.setColumnKeys(goodsColumn, goodsColumnTitle);
          this.setState({
              orderList:res.data,
              levelTowColumns,
              total:res.total,
          })
        }
      } catch(err) {
        console.log(err);
      }
    }

    // 发货
    sendOrder = async (orderId) => {
      try{
        let res = await orderApi.updateIsSend(orderId);
        if(Number(res.code)) {
          // 刷新
          this.searchPage()
          // 提示发货成功
          message.success("发货成功")
        }
      } catch(err) {
        console.log(err);
      }
    }
      
    
    componentDidMount() {
        this.searchPage(); // 请求订单数据
    }

    // 二级表格
    expandedRowRender = (record) => {
      let data = record.goods
      return<Table 
              rowKey={record => record.id}  // 如果 dataSource[i].key 没有提供，你应该使用 rowKey 来指定 dataSource 的主键
              columns={this.state.levelTowColumns} 
              dataSource={data} 
              pagination={false} 
            />
    }

    render() {
      let expandedRowRender = this.expandedRowRender; // 子表格
        return (
            // 一级表格
            <>
              <Card>
                <Search
                  placeholder="输入订单号"
                  enterButton="搜索"
                  size="middle"
                  style={{width:300}}
                  onSearch={value => this.handleSearch(value)}
                />
              </Card>
              <Table 
                columns={this.state.levelOneColumns} 
                dataSource={this.state.orderList} 
                expandable={{expandedRowRender}}
                pagination={{
                  defaultCurrent:1,
                  total:this.state.total,
                  pageSize:this.state.size,
                  onChange:(page, size) => {
                     this.handlePageChange(page,size);
                  }
                }} />
            </>
            
        )
    }
}

 
