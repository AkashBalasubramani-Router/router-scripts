// package: cosmos.app.v1alpha1
// file: cosmos/app/v1alpha1/config.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class Config extends jspb.Message {
  clearModulesList(): void;
  getModulesList(): Array<ModuleConfig>;
  setModulesList(value: Array<ModuleConfig>): void;
  addModules(value?: ModuleConfig, index?: number): ModuleConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Config.AsObject;
  static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Config;
  static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
}

export namespace Config {
  export type AsObject = {
    modulesList: Array<ModuleConfig.AsObject>,
  }
}

export class ModuleConfig extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): google_protobuf_any_pb.Any | undefined;
  setConfig(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleConfig.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleConfig): ModuleConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ModuleConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleConfig;
  static deserializeBinaryFromReader(message: ModuleConfig, reader: jspb.BinaryReader): ModuleConfig;
}

export namespace ModuleConfig {
  export type AsObject = {
    name: string,
    config?: google_protobuf_any_pb.Any.AsObject,
  }
}

