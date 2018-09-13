import { PhysicianModule } from './physician.module';

describe('PhysicianModule', () => {
  let physicianModule: PhysicianModule;

  beforeEach(() => {
    physicianModule = new PhysicianModule();
  });

  it('should create an instance', () => {
    expect(physicianModule).toBeTruthy();
  });
});
