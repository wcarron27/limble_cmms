import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Helper Methods
const ButtonClickEvents = {  left: {button: 0},  right: {button: 2},};
function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Limble CMMS Project' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Limble CMMS Project');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.task-details--title')?.textContent).toContain('Task Title Goes Here');
  });

  it('should not have any comments on initialization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.task--comments'))).toBeNull();
  })

  it('should not show the UserDropdown on initialization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.user-dropdown'))).toBeNull();  
  })

  // it('should successfully create a comment on submit', () =>> {

  // })

  it('should show the UserDropdown when "@" is typed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let textarea = fixture.debugElement.query(By.css('#comment'));
    // Act 
    textarea.triggerEventHandler('keyup', {target: {value: '@B'}}); // 3. 
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.user-dropdown'))).toBeDefined();  
  })
});
