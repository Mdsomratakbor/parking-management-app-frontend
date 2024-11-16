export interface Vehicle {
  licenseNumber: string;
  vehicleType: string;
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  entryTime: string;
  status:string;
  parkingCharge: number;
}


export interface VehicleList extends Vehicle{
vehicleId:number;
exitTime:string;
duration:number;
createdAt:string;
}
