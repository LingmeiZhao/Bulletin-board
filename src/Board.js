import React from 'react'
import Note from './Note'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
    }
    
    componentWillMount() {
		var self = this
	
		if(this.props.count) {
			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				.then(response => response.json())
				.then(json => json[0]
								.split('. ')
								.forEach(sentence => self.add(sentence.substring(0, 25))))
		}
		
	}
    
    update(newText,i) {
        console.log('updating item at index',i,newText)
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText})
        }))
    }
    
    add(text) {
        this.setState(prevState => ({
            notes : [
            ...prevState.notes,
            {
                id:this.nextId(),
                note:text
            }
            ]
        }))
    }
    
    nextId() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    
    remove(id) {
        console.log('removing item at', id)
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }
    eachNote(note, i) {
        return (
            <Note key = {i}
                index = {i}
                onChange={this.update}
                onRemove={this.remove}>
                {note.note}
                </Note>
        )
    }
    render() {
        return (
            <div className="board">
                <button onClick={this.add.bind(null, "New Node")} id ="add"> Add </button>
                {this.state.notes.map(this.eachNote)}
            </div>
        )
    }
}

export default Board
