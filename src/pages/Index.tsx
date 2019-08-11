import React, {FC} from 'react'
import CetusStatusCard from 'components/CetusStatusCard'
import VallisStatusCard from 'components/VallisStatusCard'
import './Index.css'

const Index: FC = () => {
  return (
    <div className="Index">
      <CetusStatusCard />
      <VallisStatusCard />
    </div>
  )
}

export default Index
