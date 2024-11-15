export interface ResponseMessage {
  status: boolean;
  message: string;
  data: any;
  code:number // You can define a more specific type if needed
}
