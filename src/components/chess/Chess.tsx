import * as React from 'react'
import * as Redux from 'redux'
import {Button} from 'antd'
import {style} from 'typestyle'

import {chessClickAction} from '../../models/chessClick'

declare function require(url: string): string

export interface ChessProps {
  name: string  //棋子id
  type: string  //棋子类型
  side: 1|-1  //棋子阵营
  position: [number, number]  //棋子在棋盘上的位置
}

interface dispatchProps {
  dispatch: Redux.Dispatch<any>
}

export const chessSize = 54 //棋子大小
export const spacexy = 57 //棋子间隔大小


//棋子组件
export default class Chess extends React.Component<ChessProps&dispatchProps, any> {

  //根据棋子类型选择背景图片
  chooseBackGround(type: string, side: number) { 
    let bg: string = null
    if (side == 1) {
      bg = require(`../../assets/style/r_${type}.png`)
    } else {
      bg = require(`../../assets/style/b_${type}.png`)
    }
    return bg
  }

  render() {
    const ChessStyle = style({
      position: 'absolute',
      backgroundImage: `url(${this.chooseBackGround(this.props.type, this.props.side)})`,
      width: chessSize,
      height: chessSize,
      top: -3+this.props.position[0]*spacexy,
      left: -3+this.props.position[1]*spacexy
    })
    return (
      <div className={ChessStyle} onClick={(e)=>{
        e.stopPropagation()
        this.props.dispatch(chessClickAction(this.props))}
      }>
      </div>
    )
  }
}

