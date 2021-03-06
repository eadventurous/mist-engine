import ExecuteSystem from "../ecs-core/ExecuteSystem";
import KinematicComponent from "./KinematicComponent";
import Entity from "../ecs-core/Entity";
import TransformComponent from "../positioning/TransformComponent";

export default class KinematicSystem extends ExecuteSystem {
    update(deltaTime: number, entities: ReadonlyArray<Entity>) {
        entities.forEach(e => {
            const kinem = e.getComponent(KinematicComponent) as KinematicComponent;
            const pos = e.getComponent(TransformComponent) as TransformComponent;
            pos.position = pos.position.add(kinem.velocity.mul(deltaTime));
            kinem.velocity = kinem.velocity.add(kinem.acceleration.mul(deltaTime));
        });
    }

    getAwakeCondition() {
        return [KinematicComponent, TransformComponent];
    }
}