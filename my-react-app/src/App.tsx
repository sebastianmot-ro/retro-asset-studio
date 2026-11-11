import { useState } from 'react';

export default function App() {
  const [contrast, setContrast] = useState(15);
  const [brightness, setBrightness] = useState(8);
  const [threshold, setThreshold] = useState(128);
  const [gamma, setGamma] = useState(1.00);
  const [algorithm, setAlgorithm] = useState<'floyd' | 'atkinson' | 'bayer' | 'threshold'>('floyd');
  const [preset, setPreset] = useState('ssd1306_128x64');

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#cccccc] font-sans select-none overflow-hidden">
      
      {/* 1. HEADER BAR */}
      <header className="h-9 border-b border-[#3c3c3c] bg-[#2d2d2d] px-3 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 font-bold text-[#e7e7e7]">
            <span className="w-3 h-3 bg-[#007acc] inline-block"></span>
            <span className="text-xs">Retro Asset Studio</span>
          </div>
          <nav className="flex space-x-3 text-[#cccccc] text-xs">
            <button className="hover:bg-[#3c3c3c] px-1.5 py-0.5 rounded-none">File</button>
            <button className="hover:bg-[#3c3c3c] px-1.5 py-0.5 rounded-none">Edit</button>
            <button className="hover:bg-[#3c3c3c] px-1.5 py-0.5 rounded-none">View</button>
            <button className="hover:bg-[#3c3c3c] px-1.5 py-0.5 rounded-none">Device</button>
            <button className="hover:bg-[#3c3c3c] px-1.5 py-0.5 rounded-none">Help</button>
          </nav>
        </div>

        <div className="text-[#9cdcfe] font-mono text-xs">
          moon_logo.png <span className="text-[#808080]">→</span> oled_bitmap.h
        </div>

        <div className="flex items-center space-x-1.5">
          <button className="px-2.5 py-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] text-white border border-[#555555] text-xs">
            Export .h
          </button>
          <button className="px-2.5 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white font-medium text-xs">
            Flash to device
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE (3 COLUMNS) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. LEFT SIDEBAR: Controls */}
        <aside className="w-64 border-r border-[#3c3c3c] bg-[#252526] p-3 flex flex-col space-y-4 overflow-y-auto text-xs shrink-0">
          
          {/* Section: Image Adjust */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#808080] uppercase tracking-wider text-[10px] border-b border-[#333333] pb-1">Image Adjust</h3>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[#cccccc]">
                <span>Contrast</span>
                <span className="font-mono text-[#9cdcfe]">+{contrast}</span>
              </div>
              <input 
                type="range" min="-50" max="50" value={contrast} 
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-[#007acc]" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[#cccccc]">
                <span>Brightness</span>
                <span className="font-mono text-[#9cdcfe]">+{brightness}</span>
              </div>
              <input 
                type="range" min="-50" max="50" value={brightness} 
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-[#007acc]" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[#cccccc]">
                <span>Threshold</span>
                <span className="font-mono text-[#9cdcfe]">{threshold}</span>
              </div>
              <input 
                type="range" min="0" max="255" value={threshold} 
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-[#007acc]" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[#cccccc]">
                <span>Gamma</span>
                <span className="font-mono text-[#9cdcfe]">{gamma.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.1" max="3.0" step="0.05" value={gamma} 
                onChange={(e) => setGamma(Number(e.target.value))}
                className="w-full accent-[#007acc]" 
              />
            </div>
          </div>

          {/* Section: Dithering Algorithm */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#808080] uppercase tracking-wider text-[10px] border-b border-[#333333] pb-1">Dithering Algorithm</h3>
            
            <label className={`flex items-center justify-between p-1.5 border cursor-pointer ${algorithm === 'floyd' ? 'bg-[#37373d] border-[#007acc] text-white' : 'border-[#3c3c3c] text-[#cccccc] bg-[#2d2d2d]'}`}>
              <div className="flex items-center space-x-2">
                <input type="radio" name="dither" checked={algorithm === 'floyd'} onChange={() => setAlgorithm('floyd')} className="accent-[#007acc]" />
                <span>Floyd–Steinberg</span>
              </div>
              <span className="text-[10px] font-mono text-[#808080]">ED 4</span>
            </label>

            <label className={`flex items-center justify-between p-1.5 border cursor-pointer ${algorithm === 'atkinson' ? 'bg-[#37373d] border-[#007acc] text-white' : 'border-[#3c3c3c] text-[#cccccc] bg-[#2d2d2d]'}`}>
              <div className="flex items-center space-x-2">
                <input type="radio" name="dither" checked={algorithm === 'atkinson'} onChange={() => setAlgorithm('atkinson')} className="accent-[#007acc]" />
                <span>Atkinson</span>
              </div>
              <span className="text-[10px] font-mono text-[#808080]">ED 6</span>
            </label>

            <label className={`flex items-center justify-between p-1.5 border cursor-pointer ${algorithm === 'bayer' ? 'bg-[#37373d] border-[#007acc] text-white' : 'border-[#3c3c3c] text-[#cccccc] bg-[#2d2d2d]'}`}>
              <div className="flex items-center space-x-2">
                <input type="radio" name="dither" checked={algorithm === 'bayer'} onChange={() => setAlgorithm('bayer')} className="accent-[#007acc]" />
                <span>Ordered Bayer 4×4</span>
              </div>
              <span className="text-[10px] font-mono text-[#808080]">MAT</span>
            </label>

            <label className={`flex items-center justify-between p-1.5 border cursor-pointer ${algorithm === 'threshold' ? 'bg-[#37373d] border-[#007acc] text-white' : 'border-[#3c3c3c] text-[#cccccc] bg-[#2d2d2d]'}`}>
              <div className="flex items-center space-x-2">
                <input type="radio" name="dither" checked={algorithm === 'threshold'} onChange={() => setAlgorithm('threshold')} className="accent-[#007acc]" />
                <span>Threshold</span>
              </div>
              <span className="text-[10px] font-mono text-[#808080]">NONE</span>
            </label>

            <div className="pt-1.5 space-y-1 text-[#cccccc] text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="accent-[#007acc]" />
                <span>Serpentine scan</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="accent-[#007acc]" />
                <span>Invert output</span>
              </label>
            </div>
          </div>

          {/* Section: OLED Presets */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#808080] uppercase tracking-wider text-[10px] border-b border-[#333333] pb-1">OLED Preset</h3>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => setPreset('ssd1306_128x64')}
                className={`p-1.5 border text-left ${preset === 'ssd1306_128x64' ? 'border-[#007acc] bg-[#37373d] text-white' : 'border-[#3c3c3c] bg-[#2d2d2d] text-[#cccccc]'}`}
              >
                <div className="font-bold text-xs">SSD1306</div>
                <div className="text-[10px] text-[#808080] font-mono">128×64</div>
              </button>
              <button 
                onClick={() => setPreset('ssd1306_128x32')}
                className={`p-1.5 border text-left ${preset === 'ssd1306_128x32' ? 'border-[#007acc] bg-[#37373d] text-white' : 'border-[#3c3c3c] bg-[#2d2d2d] text-[#cccccc]'}`}
              >
                <div className="font-bold text-xs">SSD1306</div>
                <div className="text-[10px] text-[#808080] font-mono">128×32</div>
              </button>
              <button 
                onClick={() => setPreset('sh1106')}
                className={`p-1.5 border text-left ${preset === 'sh1106' ? 'border-[#007acc] bg-[#37373d] text-white' : 'border-[#3c3c3c] bg-[#2d2d2d] text-[#cccccc]'}`}
              >
                <div className="font-bold text-xs">SH1106</div>
                <div className="text-[10px] text-[#808080] font-mono">132×64</div>
              </button>
              <button 
                onClick={() => setPreset('ssd1309')}
                className={`p-1.5 border text-left ${preset === 'ssd1309' ? 'border-[#007acc] bg-[#37373d] text-white' : 'border-[#3c3c3c] bg-[#2d2d2d] text-[#cccccc]'}`}
              >
                <div className="font-bold text-xs">SSD1309</div>
                <div className="text-[10px] text-[#808080] font-mono">128×64</div>
              </button>
            </div>
          </div>

          {/* Section: Output Info */}
          <div className="space-y-1 pt-2 border-t border-[#333333] text-[11px]">
            <h3 className="font-bold text-[#808080] uppercase tracking-wider text-[10px]">Output</h3>
            <div className="flex justify-between"><span className="text-[#808080]">Byte layout</span><span className="font-mono text-[#cccccc]">Vertical · LSB top</span></div>
            <div className="flex justify-between"><span className="text-[#808080]">Storage</span><span className="font-mono text-[#4ec9b0]">PROGMEM</span></div>
            <div className="flex justify-between"><span className="text-[#808080]">Array size</span><span className="font-mono text-[#cccccc]">1,024 B</span></div>
          </div>

        </aside>

        {/* 3. CENTER PANEL: Previews */}
        <main className="flex-1 bg-[#1e1e1e] p-3 flex flex-col space-y-3 overflow-y-auto">
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex border border-[#3c3c3c] bg-[#2d2d2d]">
              <button className="px-2.5 py-1 bg-[#37373d] text-white font-medium border-r border-[#3c3c3c]">Side by side</button>
              <button className="px-2.5 py-1 text-[#cccccc] hover:bg-[#3c3c3c] border-r border-[#3c3c3c]">Split slider</button>
              <button className="px-2.5 py-1 text-[#cccccc] hover:bg-[#3c3c3c]">Overlay</button>
            </div>
            <div className="flex items-center space-x-3 text-[#cccccc] text-xs font-mono">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#007acc]" />
                <span>Pixel grid</span>
              </label>
              <span className="bg-[#252526] border border-[#3c3c3c] px-2 py-0.5 text-[#cccccc]">Zoom 400%</span>
            </div>
          </div>

          {/* Canvases Side-by-Side */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-[240px]">
            {/* Input Original */}
            <div className="bg-[#252526] border border-[#3c3c3c] p-2 flex flex-col">
              <div className="flex justify-between text-xs text-[#808080] mb-1.5">
                <span className="font-bold text-[#cccccc]">Original</span>
                <span className="font-mono text-[11px]">512×256 · 8-bit gray</span>
              </div>
              <div className="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] flex items-center justify-center overflow-hidden p-2">
                <div className="text-center font-mono">
                  <div className="text-lg text-[#cccccc] font-bold tracking-widest">RETRO</div>
                  <div className="text-xs text-[#808080]">ASSET STUDIO</div>
                </div>
              </div>
            </div>

            {/* Dithered Output */}
            <div className="bg-[#252526] border border-[#3c3c3c] p-2 flex flex-col">
              <div className="flex justify-between text-xs text-[#808080] mb-1.5">
                <span className="font-bold text-[#cccccc]">Dithered bitmask</span>
                <span className="font-mono text-[#9cdcfe] text-[11px]">128×64 · 1-bit</span>
              </div>
              <div className="flex-1 bg-black border border-[#3c3c3c] flex items-center justify-center overflow-hidden p-2">
                <div className="text-center font-mono">
                  <div className="text-lg text-white font-bold tracking-widest">RETRO</div>
                  <div className="text-xs text-slate-400">ASSET STUDIO</div>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* 4. RIGHT PANEL: OLED Hardware Emulator & Code */}
        <aside className="w-[380px] border-l border-[#3c3c3c] bg-[#252526] p-3 flex flex-col space-y-3 overflow-y-auto shrink-0">
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#808080] uppercase text-[10px]">Hardware Emulator</span>
              <span className="text-[#4ec9b0] text-[10px] font-mono">● Live</span>
            </div>

            {/* OLED Frame Clasic */}
            <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-3 flex flex-col items-center">
              <div className="flex space-x-4 mb-2 text-[9px] font-mono text-[#808080]">
                <span>GND</span><span>VCC</span><span>SCL</span><span>SDA</span>
              </div>
              
              <div className="w-full h-36 bg-black border border-[#333333] flex items-center justify-center p-2">
                <div className="text-center font-mono">
                  <div className="text-xl text-white font-bold tracking-widest">RETRO</div>
                  <div className="text-xs text-slate-300 tracking-wider">ASSET STUDIO</div>
                </div>
              </div>
              
              <div className="w-full flex justify-between items-center mt-2 text-[10px] font-mono text-[#808080]">
                <span>SSD1306 · I²C 0x3C</span>
                <span>0.96" · 400 kHz</span>
              </div>
            </div>
          </div>

          {/* Code Viewer Clasic (VS Code Theme) */}
          <div className="flex-1 flex flex-col border border-[#3c3c3c] bg-[#1e1e1e] overflow-hidden text-xs min-h-[200px]">
            <div className="bg-[#2d2d2d] px-2.5 py-1 border-b border-[#3c3c3c] flex justify-between items-center">
              <div className="flex space-x-2 text-xs font-mono">
                <span className="bg-[#1e1e1e] text-[#cccccc] px-2 py-0.5 border-t border-x border-[#3c3c3c]">oled_bitmap.h</span>
                <span className="text-[#808080] px-2 py-0.5 cursor-pointer hover:text-[#cccccc]">main.ino</span>
              </div>
              <button className="text-[10px] bg-[#3c3c3c] hover:bg-[#4c4c4c] px-2 py-0.5 text-white font-mono border border-[#555555]">Copy</button>
            </div>
            
            <pre className="p-2.5 font-mono text-[11px] text-[#d4d4d4] leading-normal overflow-x-auto flex-1 bg-[#1e1e1e]">
              <code>
                <span className="text-[#6a9955]">// oled_bitmap.h – generated by Retro Asset Studio</span>{'\n'}
                <span className="text-[#6a9955]">// moon_logo.png · 128×64 · Floyd-Steinberg</span>{'\n'}
                <span className="text-[#c586c0]">#pragma once</span>{'\n'}
                <span className="text-[#c586c0]">#include</span> <span className="text-[#ce9178]">&lt;avr/pgmspace.h&gt;</span>{'\n\n'}
                <span className="text-[#569cd6]">constexpr uint8_t</span> IMG_W = <span className="text-[#b5cea8]">128</span>;{'\n'}
                <span className="text-[#569cd6]">constexpr uint8_t</span> IMG_H = <span className="text-[#b5cea8]">64</span>;{'\n\n'}
                <span className="text-[#569cd6]">const uint8_t</span> image_data[] <span className="text-[#4ec9b0]">PROGMEM</span> = {'{'}{'\n'}
                {'  '}0x00, 0x00, 0x00, 0x00, 0x10, 0x00,{'\n'}
                {'  '}0x00, 0x00, 0x00, 0x00, 0x00, 0x00,{'\n'}
                {'  '}0x00, 0x00, 0x00, 0x40, 0x00, 0x00,{'\n'}
                {'  '}0xFF, 0xEE, 0x7F, 0xFA, 0xDF, 0xF6{'\n'}
                {'}'};
              </code>
            </pre>
          </div>

        </aside>

      </div>

      {/* 5. FOOTER STATUS BAR - Classic IDE Status Bar */}
      <footer className="h-6 border-t border-[#3c3c3c] bg-[#007acc] px-3 flex items-center justify-between text-[11px] font-mono text-white shrink-0">
        <div className="flex items-center space-x-4">
          <span>COM4 · Arduino Uno (ATmega328P)</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span>Flash: 46% (14,872 / 32,256 B)</span>
          </div>

          <div className="flex items-center space-x-2">
            <span>RAM: 76% (1,560 / 2,048 B)</span>
          </div>

          <span>1,024 B in PROGMEM</span>
        </div>
      </footer>

    </div>
  );
}