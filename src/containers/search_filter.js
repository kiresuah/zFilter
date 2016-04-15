import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getOptions } from '../actions/actions'
import { resetOptions } from '../actions/actions'
import { createSystemFilterAndEvaluate } from '../actions/actions'
import { createFilterAndEvaluate } from '../actions/actions'

class SearchFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {
          input: '',
          listVisible: false,
          selectedItem: ''
        }

        this.select = this.select.bind(this)
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.update = this.update.bind(this)
        this.renderListItems = this.renderListItems.bind(this)
    }

    select(item) {
        if(item.type === 'system') this.props.createSystemFilterAndEvaluate(item.name, item.id, 0 ,0, this.props)
        else if(item.type === 'region' || item.type == 'ship' || item.type == 'group' || item.type == 'alliance') {
            this.props.createFilterAndEvaluate(item.type, item.id, item.name, this.props)
        }
        this.props.resetOptions()
        this.setState({ input: '' })
    }

    update(input) {
        this.props.resetOptions()
        this.props.getOptions(input)
    }

    show() {
        this.setState({ listVisible: true })
        document.addEventListener("click", this.hide)
    }

    hide() {
        this.props.resetOptions()
        this.setState({ listVisible: false})
        document.removeEventListener("click", this.hide)
    }

    renderListItems() {
        let items = []
        for(var i = 0; i < this.props.options.length; i++) {
            var item = this.props.options[i]
            let label = item.name
            if (label.length > 30) label = label.substring(0, 27) + '...'
            let type = item.type.charAt(0).toUpperCase() + item.type.slice(1)
            let imgUrl = `https://image.eveonline.com/Type/${item.id}_64.png`
            if (item.type === 'system') imgUrl = 'http://evemaps.dotlan.net/images/celestials/star_128.png'
            if (item.type === 'region') imgUrl = 'http://evemaps.dotlan.net/images/celestials/lava.png'
            if (item.type === 'alliance') imgUrl = `https://image.eveonline.com/Alliance/${item.id}_64.png`
            items.push(
                <div className="filter-list-item" key={ i } onClick={ this.select.bind(null, item) }>
                    <img src={ imgUrl } height="40" width="40"/>
                    <div >
                        <span className="item-name">{ label }</span>
                        <span className="item-type">{ type }</span>
                    </div>
                </div>
            )
        }
        return items
    }

    render() {
        return (
             <div>
                <input
                    placeholder="Search for a filter here..."
                    type="text"
                    className="dropdown-input"
                    onClick={ this.show }
                    onChange={(e)=>{ this.setState({ input: e.target.value }); this.update(e.target.value) }}
                    value={ this.state.input }
                />
                <div className={"filter-list" + (this.state.listVisible ? "-clicked": "")}>
                    <div className="render-list">
                        { this.renderListItems() }
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps({ killmail_list, options, system_filter, jump_filter, filters, filterID }) {
    return { killmail_list, options, system_filter, jump_filter, filters, filterID }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOptions, resetOptions, createSystemFilterAndEvaluate, createFilterAndEvaluate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)



