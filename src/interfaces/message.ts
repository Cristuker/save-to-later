export interface SendMessage {
    convoId: string
    message: Message
  }
  
  export interface Message {
    text: string
  }
  
  export interface Facet {
    index: Index
    features: Feature[]
  }
  
  export interface Index {
    byteStart: number
    byteEnd: number
  }
  
  export interface Feature {
    did?: string
    uri?: string
    tag?: string
  }
  
  export interface Embed {
    record: Record
  }
  
  export interface Record {
    uri: string
    cid: string
  }
  