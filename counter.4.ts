import {
  Action,
  Reducer,
  createStore,
  Store
} from 'redux';

interface PlusAction extends Action{
  payload: number;
}



/* declaro una funcion pura o reducer, que recibe solo dos param el estado anterior y la accion a realizar en el estado*/
let reducer: Reducer<any> = (state = { numero: 1 }, action: Action) =>{
  if(action === null) return state;
  switch(action.type){
    case 'INCREMENT':
      return Object.assign({}, state, {
            numero: state.numero + 1
          }) ;
    case 'DECREMENT':
      return Object.assign({}, state, {
            numero: state.numero - 1
          }) ;
    case 'PLUS':
      return Object.assign({}, state, {
            numero: state.numero + (<PlusAction>action).payload
          }) ;

    default:
      return state;
  }
}


/* se crean los actions que van a modificar data en el store*/
var incrementAction: Action = {
  type: 'INCREMENT'
}

var decrementAction: Action = {
  type: 'DECREMENT'
}

var plusAction: PlusAction = {
  type: 'PLUS',
  payload: 5
}

/* se crea el store y se le pasa como parámetro la fincion reducer */
let store: Store<any> = createStore<any>(reducer);

console.log('init',store.getState());//0
store.subscribe(()=>{
  console.log('subscribe to store, then store value is ',store.getState());
})

/* se despachan acciones que afectan data en el store */
store.dispatch(incrementAction);
store.dispatch(plusAction);
store.dispatch(decrementAction);