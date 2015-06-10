
declare module "falcor" {
  export class Model {
    constructor(config: any)
    static ref: any;
    bind(val: any, pathRoute: any): any;
    bindSync(...path: any[]): any;
    softBind(...path: any[]): any;
    setCache(...path: any[]): any;
    get(...path: any[]): any;
    set(path: any, value: any): any;
  }
  function get();
  function set();
}


declare module "falcor-browser" {
  function get(pathSet: any): any;
  function set(jsongEnv): any;
  function call(callPath: any, args?: any, pathSuffix?: any, paths?: any): any;

  interface IXMLHttpSource {
    get(pathSet: any): any;
    set(jsongEnv): any;
    call(callPath: any, args?: any, pathSuffix?: any, paths?: any): any;
  }
  export class XMLHttpSource implements IXMLHttpSource {
    constructor(...args);
    get(pathSet: any): any;
    set(jsongEnv): any;
    call(callPath: any, args?: any, pathSuffix?: any, paths?: any): any;
  }
  export default XMLHttpSource
}


declare module "falcor-angular" {
  class FalcorView {

  }
  class FalcorComponent {

  }
}
