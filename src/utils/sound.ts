// Sound engine muted completely per user requirement
class SoundEngine {
  public setEnabled(_enabled: boolean) {}
  public isEnabled(): boolean { return false; }
  public playHover() {}
  public playClick() {}
  public playSuccess() {}
  public playKeypress() {}
}

export const soundFx = new SoundEngine();
