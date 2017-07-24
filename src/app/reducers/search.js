// Form option reducer

const formOptionWallLinings = {
  internal: [
    { label: 'Wet/Wet', value: 'wet wet' },
    { label: 'Dry/Wet', value: 'dry wet' },
    { label: 'Dry/Dry', value: 'dry dry' },
    { label: 'Nil/Wet', value: 'wet' },
    { label: 'Nil/Dry', value: 'dry' }
  ],
  external: [
    { label: 'Ext/Dry', value: 'ext dry' },
    { label: 'Ext/Wet', value: 'ext wet' }
  ]
}

const formOptionStructure = {
  wall: [
    { label: 'Timber', value: 'timber' },
    { label: 'Steel', value: 'steel' },
    { label: 'Masonry', value: 'masonry' },
    { label: 'Masonry - FRL Upgrade', value: 'masonry frl upgrade' }
  ],
  ceiling: [
    { label: 'Floor/Ceiling', value: 'floor/ceiling' },
    { label: 'Roof/Ceiling', value: 'roof/ceiling' },
    { label: 'Ceiling (untrafficable)', value: 'ceiling (untrafficable)' }
  ],
  column: [
    { label: 'Timber', value: 'timber' },
    { label: 'Steel', value: 'steel' },
    { label: 'Concrete', value: 'concrete' },
  ],
  beam: [
    { label: 'Timber', value: 'timber' },
    { label: 'Steel', value: 'steel' },
  ]
}

const formOptionFRL = {
  wall: [
    { label: '-/-/- (No Fire Rating)', value: '0,0,0' },
    { label: '30/30/30', value: '30,30,30' },
    { label: '60/60/60', value: '60,60,60' },
    { label: '90/90/90', value: '90,90,90' },
    { label: '120/120/120', value: '120,120,120' },
    { label: '240/240/180', value: '240,240,180' },
    { label: '-/30/30', value: '0,30,30' },
    { label: '-/60/60', value: '0,60,60' },
    { label: '-/90/90', value: '0,90,90' },
    { label: '-/120/120', value: '0,120,120' },
  ],
  ceiling: [
    { label: '-/-/- (No Fire Rating)', value: '0,0,0' },
    { label: '30/30/30', value: '30,30,30' },
    { label: '60/60/60', value: '60,60,60' },
    { label: '90/90/90', value: '90,90,90' },
    { label: '120/120/120', value: '120,120,120' },
    { label: '240/240/240', value: '240,240,240' },
  ],
  column: [
    { label: '30/-/-', value: '30,0,0' },
    { label: '60/-/-', value: '60,0,0' },
    { label: '90/-/-', value: '90,0,0' },
    { label: '120/-/-', value: '120,0,0' }
  ],
  beam: [
    { label: '30/-/-', value: '30,0,0' },
    { label: '60/-/-', value: '60,0,0' },
    { label: '90/-/-', value: '90,0,0' },
    { label: '120/-/-', value: '120,0,0' }
  ]
}

const formOptionFRLDirection = {
    wallInternal: [
      { label: 'One Side', value: 'From lined side only' },
      { label: 'Both Sides', value: 'From both sides' }
    ],
    wallExternal: [
      { label: 'Outside', value: 'from outside only' },
      { label: 'Both Sides', value: 'From both sides' }
    ],
    ceiling: [
      { label: 'Above', value: 'from above' },
      { label: 'Below', value: 'from below' },
      { label: 'Both', value: 'from above and below' }
    ]
}

// Form initial options state
const formOptionsInitialState = {
  application: [
    { label: 'Wall', value: 'wall' },
    { label: 'Ceiling', value: 'ceiling' },
    { label: 'Column', value: 'column' },
    { label: 'Beam', value: 'beam' }
  ],
  structure: formOptionStructure.wall,
  wallType: [
    { label: 'Internal', value: 'internal' },
    { label: 'External', value: 'external' }
  ],
  wallLinings: formOptionWallLinings.internal,
  additionalLinings: [
    { label: 'Mould Resistant', value: 'mould' },
    { label: 'Impact Resistant', value: 'impact' }
  ],
  frl: formOptionFRL.wall,
  frlDirection: formOptionFRLDirection.wallInternal,
  additionalFrl: [
    { label: '+30 min', value: '30'},
    { label: '+60 min', value: '60'},
    { label: '+90 min', value: '90'}
  ],
  ceilingType: [
    { label: 'Direct fix', value: 'direct fix'},
    { label: 'Suspended (flush set)', value: 'suspended (flush set)'},
    { label: 'Suspended (perforated plasterboard)', value: 'suspended (perforated plasterboard)'},
    { label: 'Suspended (ceiling tile)', value: 'suspended (ceiling tile)'},
  ],
  risf: [
    { label: 'Nil', value: ''},
    { label: '30 min', value: '30'},
    { label: '60 min', value: '60'}
  ],
  lnwFloorType: [
    { label: 'Bare floor', value: 'bareFloor'},
    { label: 'Carpet & underlay', value: 'carpetUnderlay'}
  ],
  lnwPerformance: [
    { label: '35-40', value: '35,40'},
    { label: '40-45', value: '40,45'},
    { label: '45-50', value: '45,50'},
    { label: '50-55', value: '50,55'},
    { label: '58-62', value: '58,62'},
    { label: '60-62', value: '60,62'},
    { label: '60-65', value: '60,65'},
    { label: '62-65', value: '62,65'},
    { label: '65-70', value: '65,70'},
    { label: '70-75', value: '70,75'},
    { label: '75-80', value: '75,80'},
    { label: '80-85', value: '80,85'},
  ]
}

export function formOptions(state = formOptionsInitialState, action) {

  if (action.type === '@@redux-form/CHANGE') {

    if (action.meta.field === 'application') {
      if (action.payload === 'ceiling') {
        return Object.assign({}, state, {
          structure: formOptionStructure.ceiling,
          frl: formOptionFRL.ceiling,
          frlDirection: formOptionFRLDirection.ceiling
        })
      } else if (action.payload === 'wall') {
        return Object.assign({}, state, {
          structure: formOptionStructure.wall,
          frl: formOptionFRL.wall,
          frlDirection: formOptionFRLDirection.wallInternal
        })
      } else if (action.payload === 'column') {
        return Object.assign({}, state, {
          structure: formOptionStructure.column,
          frl: formOptionFRL.column
        })
      } else if (action.payload === 'beam') {
        return Object.assign({}, state, {
          structure: formOptionStructure.beam,
          frl: formOptionFRL.beam
        })
      }
    }

    if (action.meta.field === 'wallType') {

      if (action.payload === 'internal' ) {
        return Object.assign({}, state, {
          wallLinings: formOptionWallLinings.internal,
          frlDirection: formOptionFRLDirection.wallInternal
        })
      } else {
        return Object.assign({}, state, {
          wallLinings: formOptionWallLinings.external,
          frlDirection: formOptionFRLDirection.wallExternal
        })
      }
    }
  }

  return state
}

// Default form states reducer
const formStateDefaultValues = {
  wall: {
    application: 'wall',
    structure: 'timber',
    wallType: 'internal',
    wallLinings: 'wet wet',
    rw: [25,80],
    rwCtr: [20,75],
    additionalFrl: '30',
    frlDirection: 'From both sides',
    frl: '0,0,0'
  },
  ceiling: {
    application: 'ceiling',
    structure: 'floor/ceiling',
    ceilingType: 'direct fix',
    rw: [25,80],
    rwCtr: [20,75],
    nrc: [0.1,0.9],
    frl: '0,0,0',
    risf: '',
    frlDirection: 'from below',
    lnwFloorType: 'bareFloor',
    lnwPerformance: '35,40'
  },
  column: {
    application: 'column',
    structure: 'timber',
    frl: '30,0,0'
  },
  beam: {
    application: 'beam',
    structure: 'timber',
    frl: '30,0,0'
  },
  searchText: {
    searchSystem: ''
  }
}

const formStateValues = {
  reload: false,
  savedValues: formStateDefaultValues.wall,
  default: formStateDefaultValues.wall,
}

export function formState(state = formStateValues, action) {

  if (action.type === 'SUBMIT_SEARCH') {
    return Object.assign({}, state, {savedValues: action.values})
  } else if (action.type === 'BREADCRUMB_POP') {
    return Object.assign({}, state, {default: state.savedValues})
  } else if (action.type === '@@redux-form/CHANGE') {
    if (action.meta.field === 'application') {
      if (action.payload === 'wall') {
        return Object.assign({}, state, {default: formStateDefaultValues.wall})
      } else if (action.payload === 'ceiling') {
        return Object.assign({}, state, {default: formStateDefaultValues.ceiling})
      } else if (action.payload === 'column') {
        return Object.assign({}, state, {default: formStateDefaultValues.column})
      } else if (action.payload === 'beam') {
        return Object.assign({}, state, {default: formStateDefaultValues.beam})
      }
    }
  }

  return state
}

// Search result reducer
const searchResultDefault = {isComplete: false, error: false, data: []}

export function searchResult(state = searchResultDefault, action) {

  if (action.type === 'SHOW_SEARCH_RESULT') {
    return searchResultDefault
  } else if (action.type === 'SHOW_SEARCH_RESULT_SUCCESS') {

    if (typeof action.response.entities.category !== 'undefined') {
      return Object.assign({}, state, {isComplete: true, error: false, data: Object.values(action.response.entities.category)});
    }

    return Object.assign({}, state, {isComplete: true, data: []})

  } else if (action.type === 'SHOW_SEARCH_RESULT_ERROR') {

    return Object.assign({}, state, {isComplete: true, error: true});
  }

  return state
}