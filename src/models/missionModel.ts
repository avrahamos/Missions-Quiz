import { v4 } from "uuid"

export default class Mission {
  
  constructor(
    public name: string,
    public status: string,
    public priority: string,
    public description: string,
    public _id?:string
  ) {
    
  }
}