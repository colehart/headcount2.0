import React, { Component } from 'react';
import Header from '../Header'
import CardContainer from '../CardContainer'
import Comparator from '../Comparator'
import DistrictRepository from '../../helper.js';
import kinderData from '../../data/kindergartners_in_full_day_program'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      repository: {},
      districtStats: {},
      comparisons: []
    }
  }

  findAllMatches = (query) => {
    const repo = this.state.repository
    const matchingNames = repo.findAllMatches(query)
    const allMatches = {}

    matchingNames.forEach(name => {
      const district = repo.findByName(name)

      allMatches[name] = district
    })

    this.setState({districtStats: allMatches})
  }

  adjustComparisons = card => {
    const comparisons = this.state.comparisons

    if (comparisons.length < 2) {
      this.addComparison(comparisons, card)

    } else {
      const oldCard = comparisons.shift()
      this.removeComparison(oldCard)
      this.addComparison(comparisons, card)
    }
  }

  addComparison = (comparisons, card) => {
    const newComparisons = comparisons.push(card)

    this.setState({comparisons: newComparisons})
  }

  removeComparison = oldCard => {

  }

  updateRepository = (dataFile) => {
    const district = new DistrictRepository(dataFile)

    this.setState({
      repository: district,
      districtStats: district.stats
    })
  }

  componentDidMount() {
    const kinder = new DistrictRepository(kinderData)

    this.setState({
      repository: kinder,
      districtStats: kinder.stats
    })
  }

  render() {
    const districtStats = this.state.districtStats
    const comps = this.state.comparisons

    return (
      <div className="App">
        <Header findAllMatches={this.findAllMatches}/>
        { (comps.length > 0 && comps.length > 3) ? <Comparator /> : null}
        <CardContainer
          districts={districtStats}
          adjustComparisons={this.adjustComparisons}
        />
      </div>
    );
  }
}

export default App