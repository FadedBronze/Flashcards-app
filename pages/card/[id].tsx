import { useRouter } from 'next/router'
import flashCardData from '../../data/MathFlashCards.json'
import Link from 'next/link'
import { useState } from 'react'

let _flashCardData = flashCardData as {question: string, answer: string}[]

const Card = () => {
  const router = useRouter()
  const { id } = router.query

  const _id = parseInt(id as string)

  let Button = (Text: string, Works: boolean) => 
  <button className={`pr-2 pl-2 h-10 ${Works ? "bg-red-300" : "bg-gray-300"} rounded-md`}>{Text}</button>

  let [onQuestion, setOnQuestion] = useState<boolean>(true)

  return (
    id != undefined && <div className='flex items-center justify-center w-screen h-screen'>
        <div style={{width: "60vmin"}} className='h-fit bg-red-100 flex flex-col items-center justify-between p-12'>
            {onQuestion ? _flashCardData[_id].question : _flashCardData[_id].answer}
            <div className='flex w-10/12 justify-between mt-5'>
                {_id - 1 > -1 ?
                <Link href={`/card/${_id - 1}`}><a>{Button("Last", true)}</a></Link> : 
                <Link href={`/`}><a>{Button("Home", true)}</a></Link>
                }
                <div onClick={() => setOnQuestion(!onQuestion)}>{Button(onQuestion ? "Question" : "Answer", true)}</div>
                {_id + 1 < _flashCardData.length ?
                <Link href={`/card/${_id + 1}`}><a>{Button("Next", true)}</a></Link> : Button("Next", false)
                }
                <Link href={`/card/${Math.floor(Math.random() * _flashCardData.length)}`}><a>{Button("Random", true)}</a></Link>
            </div> 
        </div>
    </div>
  )
}

export default Card