/// <reference path="./types.d.ts" />

import { createChannel } from './channel'

const bus = new MessageBus()

export class Spawner<T extends {}> {
  private script: IScript<T>
  constructor(script: IScript<T>) {
    script.init()
    this.script = script
  }
  spawn(
    name: string,
    transform: Transform = new Transform({ position: new Vector3(8, 0, 8) }),
    props?: T
  ) {
    const host = new Entity(name)
    host.addComponent(transform)
    engine.addEntity(host)
    const channel = createChannel('channel-id', host, bus)
    this.script.spawn(host, props || ({} as any), channel)
  }
}
