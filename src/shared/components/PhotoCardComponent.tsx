import { Card, Button } from 'react-bootstrap';
import { IObjectItemPick } from '../interfaces/CommonInterface';

export default function PhotoCard({src, title, desc='nodesc', onClick, btnLabel, children}: IObjectItemPick) {
  function BtnElement(){
    if (btnLabel) return <Button variant="primary" onClick={onClick}>{btnLabel}</Button>
    return null;
  }
  return (
    <Card className='w-20rem d-flex flex-column justify-between'>
      <Card.Img variant="top" src={src} className='w-full object-fit-cover overflow-hidden h-20rem' />
      <Card.Body>
        <Card.Title className='h-2rem overflow-hidden text-truncate'>{title}</Card.Title>
        <Card.Text className='h-2rem overflow-hidden text-truncate white-space-wrap'>
          {desc}
        </Card.Text>
        {BtnElement()}
        {children}
      </Card.Body>
    </Card>
  );
}