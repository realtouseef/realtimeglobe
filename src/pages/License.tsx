export function License() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-20 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">License</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">MIT License</h2>
          <p className="font-mono bg-white/5 p-6 rounded-lg text-sm leading-relaxed">
            Copyright (c) {new Date().getFullYear()} RealtimeGlobe<br/><br/>

            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:<br/><br/>

            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.<br/><br/>

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Commercial Usage</h2>
          <p>
            RealtimeGlobe is open source and free for personal and commercial use under the MIT License.
            However, if you are building a competing product or using our assets, please attribute appropriately.
          </p>
        </section>
      </div>
    </div>
  );
}
