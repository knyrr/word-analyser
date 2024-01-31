import { useCallback, useEffect, useState} from 'react'
export const Input = ({onInsert, onShowWords}) => {
    const [text, setText] = useState('')
    const [selectedWords, setSelectedWords] = useState(onShowWords)
    const [highlightedText, setHighlightedText] = useState('')
    const [readOnly, setReadOnly] = useState(false)
    const [btnHidden, hideBtn] = useState(false)
    const onSubmit = (e) =>{
        e.preventDefault()
        setText('Must ja nõgine rehetare. Ahjus hõõgub tuli ja punetab sealt seinte peale. Ahju ees savik (müüritud iste), kolde kohal ahela otsas pada. Ahju kõrval pink, kartsas ja vanaema voodi. Teisel pool vastasnurgas uhmripakk, leivalabidas ja muud koli, seinas soone peal kinni- ja lahtilükatav uks, pulk sees, ja all nurga sees kassiauk. Ukse peal lahtine laud, mille kaudu valgust sisse ja suitsu välja võib lasta; ukse kõrval sulase voodi. Tagaseinas väike sagarate peal käiv uks, lingi asemel köieots. Ahjusuu ees iste, selle ees vokk, saviku lähedal pihijalg põleva peeruga. Hiline talveõhtu, õues torm ja aeg-ajalt huntide ulumine.')
        setReadOnly(true)
        hideBtn(true)
        onInsert({text})
    }
    
    const highlightWords = useCallback((words) =>{
      let input = text
        for(let i=0; i<words.length; i++){
          let word = words[i].replace(/ .*/,'')
          let regex = new RegExp('\\b'+word+'\\b', "ig")
          input = input.replace(regex, "<mark>$&</mark>")
        }
        setHighlightedText(input)
    }, [text])

    useEffect(() => {
      if (JSON.stringify(selectedWords)!==JSON.stringify(onShowWords)) {
        setSelectedWords(onShowWords);
        highlightWords(onShowWords)
      }
    }, [onShowWords, selectedWords, highlightWords]);

  return (
    <form onSubmit={onSubmit}>
        <label>Sisesta tekst:</label>
			  <br />
        {selectedWords.length>0 ? <div className='textInputDiv' dangerouslySetInnerHTML={{__html: highlightedText}}></div> : <textarea className='textInput' name='textInput' value={text} onChange={(e)=>setText(e.target.value)} readOnly={readOnly}/>}
        <input className='analyseBtn' type="submit" value="Analüüsi" hidden={btnHidden}/>
    </form>
  )
}