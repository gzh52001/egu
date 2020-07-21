import React,{Component} from 'react'
import { Popover, NavBar, Icon } from 'antd-mobile';

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class Shiyan extends Component {
  state = {
    visible: false,
    selected: '',
  };
  onSelect = (opt) => {
   /*  console.log('这是回调的函数：',opt.props.value);
    console.log(this); */
    this.setState({
      visible: false,
     /*  selected: opt.props.value, */
    });
    // this.props.history.push(opt.props.value);

  };
 /*  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }; */
  render() {
    return (<div>
      <NavBar
        mode="light" //主题颜色
        rightContent={
          <Popover mask //遮罩层开启
           /*  overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }} */
            visible={this.state.visible}  //遮罩状态
            overlay={[
              (<Item key="4" value="1" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">首页</Item>),
              (<Item key="5" value="2" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>分类</Item>),
              (<Item key="6" value="3" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>宅配</span>
              </Item>),
              (<Item key="7"icon={myImg('PKAgAqZWJVNwKsAJSmXd')}>购物车</Item>)
            ]}
            align={{   //气泡位置
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            // onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}   //选中函数回调
          >
            <div style={{  //气泡框位置
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        }
      >
         登录
      </NavBar>
    </div>);
  }
}
export default Shiyan;
/* ReactDOM.render(<App />, mountNode); */