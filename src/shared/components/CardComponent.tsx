import { IObjectItemPick } from '../interfaces/CommonInterface';

export default function CardComponent({title, children, customClass}: IObjectItemPick) {
  return (
    <div className={'card '+customClass}>
      <h5 className="card-header text-center">{title}</h5>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}