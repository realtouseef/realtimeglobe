export function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-20 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using RealtimeGlobe, you agree to be bound by these Terms of Service and our Privacy Policy.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on RealtimeGlobe's website for personal, non-commercial transitory viewing only.
          </p>
          <p className="mt-2">
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on RealtimeGlobe's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
          <p>
            The materials on RealtimeGlobe's website are provided on an 'as is' basis. RealtimeGlobe makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
          <p>
            In no event shall RealtimeGlobe or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RealtimeGlobe's website.
          </p>
        </section>
      </div>
    </div>
  );
}
