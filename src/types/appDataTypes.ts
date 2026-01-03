import { PolygonGeometry } from "./geometryTypes";
import { PointGeometry } from "./geometryTypes";

export interface Emergency {
  EmergencyID: string;
  Name: string;
  Status: "Active" | "Resolved";
  StartTime: string;
  EndTime: string | null;
  EstimatedEvacMinutes: number;
  Description: string;
  LastUpdated: string;
}

export interface EvacuationZone {
  ZoneID: string;
  EmergencyID: string;
  Name: string;
  ZoneType: "Danger" | "Warning" | "Safe";
  Status: "Active" | "Inactive";
  RiskLevel: number;
  LastUpdated: string;
  geometry: PolygonGeometry;
}

export interface Personnel {
  PersonID: string;
  EmergencyID: string;
  FullName: string;
  Initials: string;
  PhotoURL: string;
  Role: string;
  Status: 0 | 1;
  MovingStatus: "Moving" | "Still" | "Evacuated";
  LastUpdate: string;
  TeamID: string;
  geometry: PointGeometry;
}
// in status => 1=Evacuated / 0=not Evacuated

export interface SafetyAsset {
  AssetID: string;
  EmergencyID: string;
  Name: string;
  AssetType: "assembly" | "exit" | "extinguisher" | "firstaid" | "shower";
  IsEvacuationTarget: 0 | 1;
  Capacity: number;
  Status: "Active" | "Inactive";
  Description: string;
  geometry: PointGeometry;
}
