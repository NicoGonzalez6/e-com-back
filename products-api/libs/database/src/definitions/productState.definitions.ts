export enum productStates {
  new = 'nuevo',
  used = 'usado',
}

export interface productStateI {
  id: number;
  state: productStates.new | productStates.used;
}
