import React, { ReactNode } from 'react'
import { ICssProps, IList} from '../../../typings/utils';
import Css from './index.scss'


const Index: React.FC<ICssProps> = (props) => {
  let list = props.list.concat(props.list);
  console.log('list', list);
  return (
    <React.Fragment>
        <div className={Css['boxImage']}>
          <div className={Css['content']}>
            {
              list.map((item: IList, index: number) : ReactNode  => {
                return (
                  <div className={Css['contentItem']} style={{backgroundImage: `url(${require('./image/' + item.url).default})`}} key={item.title + index}></div>
                )
              })
            }
          </div>
        </div>
    </React.Fragment>
  )
}

export default Index;