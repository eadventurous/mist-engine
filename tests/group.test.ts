import Component from "../engine/ecs-core/Component";
import Entity from "../engine/ecs-core/Entity";
import Group from "../engine/ecs-core/Group";
import { ComponentEvent } from "../engine/ecs-core/ComponentEvent";

class TestComponent extends Component { }
class TestComponent1 extends Component { }

test("matching entities on group create", () => {
    const entity1 = new Entity(() => { }, () => { }, () => { }).addComponent(TestComponent);
    const entity2 = new Entity(() => { }, () => { }, () => { }).addComponent(TestComponent1);
    const entity3 = new Entity(() => { }, () => { }, () => { });
    const group = new Group([TestComponent], [entity1, entity2, entity3]);
    expect(group.matchingEntities).toEqual([entity1]);
});

test("mathing entities after group update", () => {
    const entity1 = new Entity(() => { }, () => { }, () => { }).addComponent(TestComponent);
    const entity2 = new Entity(() => { }, () => { }, () => { }).addComponent(TestComponent1);
    const entity3 = new Entity(() => { }, () => { }, () => { });
    const group = new Group([TestComponent], [entity1, entity2, entity3]);
    entity3.addComponent(TestComponent);
    group.update(entity3, ComponentEvent.Added);
    expect(group.matchingEntities).toEqual([entity1, entity3]);
})