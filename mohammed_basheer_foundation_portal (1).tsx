import React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Award, CheckCircle, FileText, Phone, Mail, MapPin, 
  HelpCircle, ArrowRight, DollarSign, Activity, Users, Building, 
  Sparkles, Download, Lock, ChevronRight, X, Layers, Percent, Clock
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  
  // Patient Application State
  const [appStep, setAppStep] = useState(1);
  const [patientData, setPatientData] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
    panchayatWard: '',
    hospitalName: '',
    frequency: '3_times_week',
    nephrologist: '',
    karunyaCard: '',
    incomeLevel: 'bpl',
    hasPrescription: false,
    submitted: false,
    applicationId: ''
  });

  // Donation State
  const [donationTier, setDonationTier] = useState(1200); // 1 session default
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('session'); // 'session', 'month', 'corpus', 'zakat'
  const [wants80G, setWants80G] = useState(true);
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pan: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Stats Counters Simulation
  const [stats, setStats] = useState({
    sessions: 4280,
    patients: 312,
    hospitals: 14,
    corpusProgress: 45 // in Crores
  });

  // Handle Application Submit
  const handleAppSubmit = (e) => {
    e.preventDefault();
    const id = 'MBCF-' + Math.floor(100000 + Math.random() * 900000);
    setPatientData(prev => ({ ...prev, submitted: true, applicationId: id }));
  };

  // Handle Payment Submit
  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      const finalAmt = donationTier === 'custom' ? parseFloat(customAmount || 0) : donationTier;
      setReceiptData({
        receiptNo: 'REC-MB-' + Math.floor(10000 + Math.random() * 90000),
        donorName: donorDetails.name || 'Well Wisher',
        amount: finalAmt,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        pan: donorDetails.pan || 'N/A',
        taxBenefit: wants80G ? `Eligible for 50% deduction under Sec 80G` : 'N/A'
      });
      setPaymentSuccess(true);
      // Update counters dynamically
      setStats(prev => ({ ...prev, sessions: prev.sessions + Math.max(1, Math.floor(finalAmt / 1200)) }));
    }, 1500);
  };

  return (
    <div style={styles.appContainer}>
      {/* GLOBAL CUSTOM CSS STYLES INJECTED VIA STYLE TAG */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          background-color: #F8FAFC;
          color: #1E293B;
          line-height: 1.6;
        }
        button {
          cursor: pointer;
          border: none;
          outline: none;
          transition: all 0.2s ease-in-out;
        }
        input, select, textarea {
          outline: none;
          font-family: inherit;
        }
        .pulse-badge {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(15, 23, 42, 0.12);
        }
      `}</style>

      {/* HEADER / NAVIGATION */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoGroup} onClick={() => setActiveTab('home')}>
            <div style={styles.logoIcon}>
              <Heart color="#FFFFFF" size={22} fill="#FFFFFF" />
            </div>
            <div>
              <h1 style={styles.logoTitle}>Mohammed Basheer</h1>
              <p style={styles.logoSubtitle}>Charitable Foundation • Thiruvananthapuram</p>
            </div>
          </div>

          <nav style={styles.navLinks}>
            <button 
              style={activeTab === 'home' ? styles.navLinkActive : styles.navLink} 
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            <button 
              style={activeTab === 'dialysis' ? styles.navLinkActive : styles.navLink} 
              onClick={() => setActiveTab('dialysis')}
            >
              Dialysis Care
            </button>
            <button 
              style={activeTab === 'apply' ? styles.navLinkActive : styles.navLink} 
              onClick={() => setActiveTab('apply')}
            >
              Apply for Support
            </button>
            <button 
              style={activeTab === 'transparency' ? styles.navLinkActive : styles.navLink} 
              onClick={() => setActiveTab('transparency')}
            >
              Governance & Transparency
            </button>
          </nav>

          <div style={styles.headerActions}>
            <button style={styles.btnSecondary} onClick={() => setActiveTab('apply')}>
              Get Free Care
            </button>
            <button style={styles.btnPrimary} onClick={() => setActiveTab('donate')}>
              <Heart size={16} fill="#FFF" style={{ marginRight: 6 }} /> Donate Now
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (If on Home) */}
      {activeTab === 'home' && (
        <>
          <section style={styles.heroSection}>
            <div style={styles.heroContainer}>
              <div style={styles.heroContent}>
                <div style={styles.trustBadge}>
                  <Shield size={14} color="#059669" />
                  <span style={styles.trustBadgeText}>100% Free Care • Ethical ESG Reserve • 12A & 80G Certified</span>
                </div>
                <h2 style={styles.heroHeading}>
                  Lifesaving Free Dialysis for Every Patient in Thiruvananthapuram
                </h2>
                <p style={styles.heroSubheading}>
                  Established under the Mohammed Basheer Charitable Foundation, we operate a self-sustaining corpus model to sponsor 100% free hemodialysis, consumables, and renal care for underprivileged kidney patients.
                </p>
                <div style={styles.heroCTAButtons}>
                  <button style={styles.btnHeroPrimary} onClick={() => setActiveTab('donate')}>
                    Sponsor a Dialysis Session <ArrowRight size={18} style={{ marginLeft: 8 }} />
                  </button>
                  <button style={styles.btnHeroSecondary} onClick={() => setActiveTab('apply')}>
                    Request Free Dialysis
                  </button>
                </div>
                <div style={styles.heroLegalNotice}>
                  <CheckCircle size={15} color="#059669" /> Registered Public Charitable Trust • SRO Thiruvananthapuram
                </div>
              </div>

              {/* STATS COUNTER CARD */}
              <div style={styles.heroStatsCard}>
                <div style={styles.statsCardHeader}>
                  <Activity size={20} color="#059669" />
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>Live Foundation Impact</span>
                  <span style={styles.liveIndicator}>LIVE</span>
                </div>
                
                <div style={styles.statsGrid}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{stats.sessions.toLocaleString()}</div>
                    <div style={styles.statLabel}>Free Sessions Delivered</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{stats.patients}</div>
                    <div style={styles.statLabel}>Active Patients Supported</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{stats.hospitals}</div>
                    <div style={styles.statLabel}>Partner Hospital Dialysis Wings</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>₹1,000 Cr</div>
                    <div style={styles.statLabel}>Corpus Scaling Target</div>
                  </div>
                </div>

                <div style={styles.corpusBarContainer}>
                  <div style={styles.corpusBarHeader}>
                    <span>Reserve Corpus Growth (Source 6 Leg)</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>₹{stats.corpusProgress} Cr Active</span>
                  </div>
                  <div style={styles.corpusBarTrack}>
                    <div style={{ ...styles.corpusBarFill, width: `${(stats.corpusProgress / 1000) * 100 + 4}%` }}></div>
                  </div>
                  <p style={styles.corpusBarFootnote}>
                    Invested 100% under Sec 11(5) in Ethical Funds & Real Estate to yield permanent operational income.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THREE CORE PILLARS SECTION */}
          <section style={styles.pillarsSection}>
            <div style={styles.sectionTitleBlock}>
              <h3 style={styles.sectionPretitle}>OUR OPERATIONAL MODEL</h3>
              <h2 style={styles.sectionTitle}>How We Deliver 100% Free Dialysis</h2>
              <p style={styles.sectionDescription}>
                We combine hospital partnerships with a permanent ethical endowment reserve so patients never pay out of pocket.
              </p>
            </div>

            <div style={styles.pillarsGrid}>
              <div style={styles.pillarCard} className="card-hover">
                <div style={{ ...styles.pillarIconBg, backgroundColor: '#EFF6FF' }}>
                  <Building size={28} color="#2563EB" />
                </div>
                <h3 style={styles.pillarTitle}>1. Hospital Sponsorship Network</h3>
                <p style={styles.pillarText}>
                  Rather than waiting for physical construction, we partner directly with established dialysis units in Thiruvananthapuram to fund patient sessions immediately.
                </p>
              </div>

              <div style={styles.pillarCard} className="card-hover">
                <div style={{ ...styles.pillarIconBg, backgroundColor: '#ECFDF5' }}>
                  <Layers size={28} color="#059669" />
                </div>
                <h3 style={styles.pillarTitle}>2. Government Scheme Co-Funding</h3>
                <p style={styles.pillarText}>
                  We bridge the gap for patients with Karunya, KASP, or MEDISEP cards by paying for dialyzers, bloodlines, EPO injections, and medicine kits.
                </p>
              </div>

              <div style={styles.pillarCard} className="card-hover">
                <div style={{ ...styles.pillarIconBg, backgroundColor: '#F5F3FF' }}>
                  <Sparkles size={28} color="#7C3AED" />
                </div>
                <h3 style={styles.pillarTitle}>3. Self-Sustaining Reserve Corpus</h3>
                <p style={styles.pillarText}>
                  Accumulating 15% annual reserves into Section 11(5) approved Ethical Equities & Rental Property generates perpetual institutional yields for annual running costs.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* DIALYSIS CARE INFORMATION PAGE */}
      {activeTab === 'dialysis' && (
        <section style={styles.pageContainer}>
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>Renal Care & Free Hemodialysis Program</h2>
            <p style={styles.pageSub}>
              Providing dignified, zero-cost chronic kidney treatment to patients across Thiruvananthapuram district.
            </p>
          </div>

          <div style={styles.gridTwoColumn}>
            <div style={styles.contentBlock}>
              <h3 style={styles.blockTitle}>The Critical Need in Thiruvananthapuram</h3>
              <p style={styles.paragraph}>
                Chronic Kidney Disease (CKD) requires patients to undergo 2 to 3 hemodialysis sessions every single week for life. In Trivandrum, a low-income family spends over ₹14,000 to ₹20,000 monthly on base sessions, specialized dialyzer filters, and Erythropoietin (EPO) injections.
              </p>
              <p style={styles.paragraph}>
                The <strong>Mohammed Basheer Charitable Foundation</strong> removes 100% of this financial burden through direct hospital bill clearance and consumable support.
              </p>

              <div style={styles.checklistGrid}>
                <div style={styles.checkItem}><CheckCircle size={18} color="#059669" /> 100% Free Hemodialysis Sessions</div>
                <div style={styles.checkItem}><CheckCircle size={18} color="#059669" /> Free High-Flux Dialyzer Filters & Tubing</div>
                <div style={styles.checkItem}><CheckCircle size={18} color="#059669" /> Erythropoietin (EPO) Injections & Medicine Kits</div>
                <div style={styles.checkItem}><CheckCircle size={18} color="#059669" /> Direct Hospital Billing (No Reimbursement Delays)</div>
                <div style={styles.checkItem}><CheckCircle size={18} color="#059669" /> AV Fistula Surgery Assistance</div>
                <div style={styles.checkItem}><CheckCircle size={18} color="#059669" /> Full Coverage for Karunya & Non-Karunya BPL Patients</div>
              </div>
            </div>

            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Partner Dialysis Hubs</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: 16 }}>
                Patients can access free treatment at our affiliated hospital networks in Trivandrum:
              </p>
              <ul style={styles.hospitalList}>
                <li style={styles.hospitalListItem}>
                  <strong>Govt. Medical College Hospital Wing</strong>
                  <span style={styles.hospitalTag}>Trivandrum City</span>
                </li>
                <li style={styles.hospitalListItem}>
                  <strong>General Hospital Dialysis Center</strong>
                  <span style={styles.hospitalTag}>Palayam</span>
                </li>
                <li style={styles.hospitalListItem}>
                  <strong>Regional Charitable Kidney Care Units</strong>
                  <span style={styles.hospitalTag}>Neyyattinkara / Attingal</span>
                </li>
              </ul>
              <button style={{ ...styles.btnPrimary, width: '100%', marginTop: 20 }} onClick={() => setActiveTab('apply')}>
                Apply for Dialysis Assistance
              </button>
            </div>
          </div>
        </section>
      )}

      {/* MULTI-STEP PATIENT APPLICATION PORTAL */}
      {activeTab === 'apply' && (
        <section style={styles.pageContainer}>
          <div style={styles.formCard}>
            {patientData.submitted ? (
              <div style={styles.successState}>
                <div style={styles.successIconCircle}>
                  <CheckCircle size={48} color="#059669" />
                </div>
                <h3 style={styles.successHeading}>Application Submitted Successfully</h3>
                <p style={styles.successSub}>
                  Your application for 100% Free Dialysis Support has been registered under the Mohammed Basheer Foundation.
                </p>
                <div style={styles.appIdBox}>
                  <span>Application Reference ID:</span>
                  <strong style={{ fontSize: '1.2rem', color: '#0F172A' }}>{patientData.applicationId}</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 24 }}>
                  Our verification officer in Thiruvananthapuram will review your medical prescription and contact you within 24 to 48 hours.
                </p>
                <button 
                  style={styles.btnSecondary} 
                  onClick={() => {
                    setPatientData(prev => ({ ...prev, submitted: false }));
                    setAppStep(1);
                  }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <>
                <div style={styles.formHeader}>
                  <h2>Free Dialysis Patient Application</h2>
                  <p>Thiruvananthapuram Resident Financial & Medical Relief Form</p>
                </div>

                {/* PROGRESS BAR */}
                <div style={styles.stepperTrack}>
                  <div style={appStep >= 1 ? styles.stepActive : styles.stepInactive}>
                    <span>1</span> Personal Details
                  </div>
                  <div style={appStep >= 2 ? styles.stepActive : styles.stepInactive}>
                    <span>2</span> Medical Info
                  </div>
                  <div style={appStep >= 3 ? styles.stepActive : styles.stepInactive}>
                    <span>3</span> Verification
                  </div>
                </div>

                <form onSubmit={handleAppSubmit}>
                  {/* STEP 1: PERSONAL DETAILS */}
                  {appStep === 1 && (
                    <div style={styles.stepContent}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Patient Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="As per Aadhaar Card" 
                          style={styles.input}
                          value={patientData.fullName}
                          onChange={e => setPatientData({...patientData, fullName: e.target.value})}
                        />
                      </div>

                      <div style={styles.formRow}>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                          <label style={styles.label}>Age *</label>
                          <input 
                            type="number" 
                            required 
                            placeholder="e.g. 52" 
                            style={styles.input}
                            value={patientData.age}
                            onChange={e => setPatientData({...patientData, age: e.target.value})}
                          />
                        </div>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                          <label style={styles.label}>Gender</label>
                          <select 
                            style={styles.input}
                            value={patientData.gender}
                            onChange={e => setPatientData({...patientData, gender: e.target.value})}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Mobile Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="10-digit mobile number" 
                          style={styles.input}
                          value={patientData.phone}
                          onChange={e => setPatientData({...patientData, phone: e.target.value})}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Residential Address in Thiruvananthapuram *</label>
                        <textarea 
                          required 
                          rows={3} 
                          placeholder="House Name/No., Street, Local Area, Trivandrum" 
                          style={styles.input}
                          value={patientData.address}
                          onChange={e => setPatientData({...patientData, address: e.target.value})}
                        />
                      </div>

                      <div style={styles.btnRow}>
                        <button type="button" style={styles.btnPrimary} onClick={() => setAppStep(2)}>
                          Next: Medical Details <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: MEDICAL INFO */}
                  {appStep === 2 && (
                    <div style={styles.stepContent}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Hospital / Dialysis Unit Currently Attending *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Govt Medical College TVM / Private Clinic" 
                          style={styles.input}
                          value={patientData.hospitalName}
                          onChange={e => setPatientData({...patientData, hospitalName: e.target.value})}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Required Dialysis Frequency *</label>
                        <select 
                          style={styles.input}
                          value={patientData.frequency}
                          onChange={e => setPatientData({...patientData, frequency: e.target.value})}
                        >
                          <option value="3_times_week">3 Sessions per week (Standard ESRD)</option>
                          <option value="2_times_week">2 Sessions per week</option>
                          <option value="1_time_week">1 Session per week</option>
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Attending Nephrologist Name</label>
                        <input 
                          type="text" 
                          placeholder="Dr. Name (Optional)" 
                          style={styles.input}
                          value={patientData.nephrologist}
                          onChange={e => setPatientData({...patientData, nephrologist: e.target.value})}
                        />
                      </div>

                      <div style={styles.btnRow}>
                        <button type="button" style={styles.btnSecondary} onClick={() => setAppStep(1)}>
                          Back
                        </button>
                        <button type="button" style={styles.btnPrimary} onClick={() => setAppStep(3)}>
                          Next: Verification <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: DOCUMENT VERIFICATION */}
                  {appStep === 3 && (
                    <div style={styles.stepContent}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Economic Category</label>
                        <select 
                          style={styles.input}
                          value={patientData.incomeLevel}
                          onChange={e => setPatientData({...patientData, incomeLevel: e.target.value})}
                        >
                          <option value="bpl">Below Poverty Line (BPL / Yellow Card)</option>
                          <option value="low_income">Low Income (Pink / Blue Card)</option>
                          <option value="general_needy">General Financial Hardship</option>
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Karunya / KASP / MEDISEP Card Number (If Available)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. KASP-10293848" 
                          style={styles.input}
                          value={patientData.karunyaCard}
                          onChange={e => setPatientData({...patientData, karunyaCard: e.target.value})}
                        />
                      </div>

                      <div style={styles.fileUploadBox}>
                        <FileText size={28} color="#059669" />
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontWeight: 600, display: 'block' }}>Upload Nephrologist Prescription / Dialysis Recommendation</span>
                          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Mock Upload • PDF, JPG or PNG (Max 5MB)</span>
                        </div>
                        <input 
                          type="file" 
                          style={{ display: 'none' }} 
                          id="prescription-file"
                          onChange={() => setPatientData(prev => ({ ...prev, hasPrescription: true }))}
                        />
                        <label htmlFor="prescription-file" style={styles.btnOutline}>
                          {patientData.hasPrescription ? '✓ File Selected' : 'Choose File'}
                        </label>
                      </div>

                      <div style={styles.declarationBox}>
                        <input type="checkbox" required id="decl" style={{ marginRight: 8, accentColor: '#059669' }} />
                        <label htmlFor="decl" style={{ fontSize: '0.85rem', color: '#475569' }}>
                          I declare that the patient resides in Thiruvananthapuram district and the medical details provided are accurate to receive 100% free care under the Mohammed Basheer Foundation.
                        </label>
                      </div>

                      <div style={styles.btnRow}>
                        <button type="button" style={styles.btnSecondary} onClick={() => setAppStep(2)}>
                          Back
                        </button>
                        <button type="submit" style={styles.btnPrimary}>
                          Submit Final Application
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </section>
      )}

      {/* INTERACTIVE DONATION ENGINE */}
      {activeTab === 'donate' && (
        <section style={styles.pageContainer}>
          <div style={styles.donationGrid}>
            
            {/* LEFT: DONATION FORM */}
            <div style={styles.donationCard}>
              <h2 style={styles.donationTitle}>Sponsor Free Dialysis</h2>
              <p style={styles.donationSub}>
                100% of your contribution goes directly to patient sessions or ethical reserve scaling.
              </p>

              {/* TIER SELECTOR */}
              <div style={styles.tierGrid}>
                <div 
                  style={donationTier === 1200 ? styles.tierBoxActive : styles.tierBox}
                  onClick={() => { setDonationTier(1200); setDonationType('session'); }}
                >
                  <span style={styles.tierTag}>POPULAR</span>
                  <div style={styles.tierAmount}>₹1,200</div>
                  <div style={styles.tierLabel}>Sponsor 1 Dialysis Session</div>
                </div>

                <div 
                  style={donationTier === 14400 ? styles.tierBoxActive : styles.tierBox}
                  onClick={() => { setDonationTier(14400); setDonationType('month'); }}
                >
                  <div style={styles.tierAmount}>₹14,400</div>
                  <div style={styles.tierLabel}>Sponsor 1 Month of Care (12 Sessions)</div>
                </div>

                <div 
                  style={donationTier === 'custom' ? styles.tierBoxActive : styles.tierBox}
                  onClick={() => { setDonationTier('custom'); setDonationType('corpus'); }}
                >
                  <div style={styles.tierAmount}>Custom Relief</div>
                  <div style={styles.tierLabel}>Corpus Reserve Contribution</div>
                </div>
              </div>

              {donationTier === 'custom' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Enter Custom Donation Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 50000" 
                    style={styles.input}
                    value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                  />
                </div>
              )}

              {/* 80G TAX EXEMPTION TOGGLE */}
              <div style={styles.taxToggleCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: '#0F172A', display: 'block' }}>Claim 80G Tax Exemption Certificate</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>50% tax deduction on taxable income under Indian IT Act</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={wants80G} 
                    onChange={e => setWants80G(e.target.checked)}
                    style={{ width: 20, height: 20, accentColor: '#059669' }}
                  />
                </div>

                {wants80G && (
                  <div style={{ marginTop: 12 }}>
                    <label style={styles.label}>PAN Card Number (Required for 80G Receipt)</label>
                    <input 
                      type="text" 
                      placeholder="ABCDE1234F" 
                      style={styles.input}
                      value={donorDetails.pan}
                      onChange={e => setDonorDetails({...donorDetails, pan: e.target.value.toUpperCase()})}
                    />
                  </div>
                )}
              </div>

              {/* DONOR CONTACT INFO */}
              <form onSubmit={handleDonateSubmit} style={{ marginTop: 20 }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name" 
                    style={styles.input}
                    value={donorDetails.name}
                    onChange={e => setDonorDetails({...donorDetails, name: e.target.value})}
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={{ ...styles.formGroup, flex: 1 }}>
                    <label style={styles.label}>Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="name@example.com" 
                      style={styles.input}
                      value={donorDetails.email}
                      onChange={e => setDonorDetails({...donorDetails, email: e.target.value})}
                    />
                  </div>
                  <div style={{ ...styles.formGroup, flex: 1 }}>
                    <label style={styles.label}>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile" 
                      style={styles.input}
                      value={donorDetails.phone}
                      onChange={e => setDonorDetails({...donorDetails, phone: e.target.value})}
                    />
                  </div>
                </div>

                <button type="submit" style={{ ...styles.btnPrimary, width: '100%', padding: 14, marginTop: 10 }}>
                  {isProcessingPayment ? 'Connecting Secure Gateway...' : 'Proceed to Donate (UPI / Cards / NetBanking)'}
                </button>
              </form>
            </div>

            {/* RIGHT: IMPACT SUMMARY / SIMULATED RECEIPT */}
            <div style={styles.donationSidebar}>
              {paymentSuccess && receiptData ? (
                <div style={styles.receiptCard}>
                  <div style={styles.receiptHeader}>
                    <CheckCircle size={32} color="#059669" />
                    <h3 style={{ color: '#0F172A', marginTop: 8 }}>Official Donation Receipt</h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Mohammed Basheer Charitable Foundation</p>
                  </div>

                  <div style={styles.receiptDetails}>
                    <div style={styles.receiptRow}>
                      <span>Receipt No:</span>
                      <strong>{receiptData.receiptNo}</strong>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Donor Name:</span>
                      <strong>{receiptData.donorName}</strong>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Amount Paid:</span>
                      <strong style={{ color: '#059669', fontSize: '1.2rem' }}>₹{receiptData.amount.toLocaleString()}</strong>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Date:</span>
                      <span>{receiptData.date}</span>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>PAN Number:</span>
                      <span>{receiptData.pan}</span>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Tax Exemption Status:</span>
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>{receiptData.taxBenefit}</span>
                    </div>
                  </div>

                  <button style={{ ...styles.btnSecondary, width: '100%', marginTop: 16 }}>
                    <Download size={16} style={{ marginRight: 6 }} /> Download Official PDF Receipt
                  </button>
                </div>
              ) : (
                <div style={styles.summaryCard}>
                  <h3 style={styles.summaryTitle}>Your Direct Impact</h3>
                  
                  <div style={styles.impactBox}>
                    <Heart size={24} color="#059669" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0F172A' }}>
                        {donationTier === 1200 && '1 Full Dialysis Session Sponsored'}
                        {donationTier === 14400 && '12 Dialysis Sessions (1 Month)'}
                        {donationTier === 'custom' && 'Corpus Reserve Expansion'}
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                        Covers high-flux dialyzer, bloodlines, heparin, and nursing staff in Trivandrum.
                      </span>
                    </div>
                  </div>

                  <div style={styles.guaranteeBox}>
                    <Lock size={16} color="#059669" style={{ marginRight: 8 }} />
                    <span style={{ fontSize: '0.8rem', color: '#334155' }}>
                      256-bit Encrypted SSL Payment Gateway. 100% Ethical Fund Allocation.
                    </span>
                  </div>

                  <div style={styles.badgeGroup}>
                    <span style={styles.smallBadge}>80G Approved</span>
                    <span style={styles.smallBadge}>12A Certified</span>
                    <span style={styles.smallBadge}>CSR-1 Registered</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* GOVERNANCE & TRANSPARENCY DASHBOARD */}
      {activeTab === 'transparency' && (
        <section style={styles.pageContainer}>
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>Institutional Governance & Ethical Reserve Strategy</h2>
            <p style={styles.pageSub}>
              Adhering strictly to Indian Income Tax Section 11(5) regulations and non-speculative, ESG-screened capital principles.
            </p>
          </div>

          {/* 85% / 15% RULE BREAKDOWN */}
          <div style={styles.gridTwoColumn}>
            <div style={styles.contentBlock}>
              <h3 style={styles.blockTitle}>The 85/15 Governance Rule</h3>
              <p style={styles.paragraph}>
                Under Section 11(1)(a) of the Income Tax Act, public charitable trusts must apply at least 85% of their gross annual income directly to charitable healthcare activities, while accumulating up to 15% into approved capital-safe reserve assets.
              </p>

              <div style={styles.ratioCardGrid}>
                <div style={{ ...styles.ratioCard, borderLeft: '4px solid #059669' }}>
                  <div style={styles.ratioPercent}>85%</div>
                  <h4 style={styles.ratioTitle}>Direct Patient Relief (Spent Annually)</h4>
                  <p style={styles.ratioDesc}>
                    Clearing dialysis bills at partner hospitals, bulk purchasing dialyzers, EPO injections, and technician salaries.
                  </p>
                </div>

                <div style={{ ...styles.ratioCard, borderLeft: '4px solid #2563EB' }}>
                  <div style={{ ...styles.ratioPercent, color: '#2563EB' }}>15%</div>
                  <h4 style={styles.ratioTitle}>Self-Sustaining Corpus (Source 6 Leg)</h4>
                  <p style={styles.ratioDesc}>
                    Accumulated into ESG-screened ethical mutual funds and commercial rental property to generate perpetual operational yields.
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Approved Section 11(5) Investment Modes</h3>
              <ul style={styles.shariahList}>
                <li style={styles.shariahItem}>
                  <CheckCircle size={18} color="#059669" />
                  <div>
                    <strong>Commercial Rental Real Estate (Lease Income)</strong>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Sec 11(5)(x) Approved • Rental yields directly pay running dialysis costs.</p>
                  </div>
                </li>
                <li style={styles.shariahItem}>
                  <CheckCircle size={18} color="#059669" />
                  <div>
                    <strong>SEBI Ethical Equity Mutual Funds & ETFs</strong>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Sec 11(5)(xib) Approved • ESG-screened equity funds delivering sustainable dividend yields.</p>
                  </div>
                </li>
                <li style={styles.shariahItem}>
                  <CheckCircle size={18} color="#059669" />
                  <div>
                    <strong>Institutional Operating Accounts</strong>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Sec 11(5)(iii) Approved • Secure capital accounts with scheduled commercial banks.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* OFFICIAL REGULATORY BADGES */}
          <div style={styles.regulatorySection}>
            <h3 style={styles.regulatoryHeading}>Official Trust Certifications</h3>
            <div style={styles.badgeGrid}>
              <div style={styles.certCard}>
                <Award size={32} color="#059669" />
                <h4>SRO Registered Trust</h4>
                <p>Registered Public Charitable Trust at Thiruvananthapuram Sub-Registrar Office.</p>
              </div>
              <div style={styles.certCard}>
                <Shield size={32} color="#059669" />
                <h4>12A Tax Exemption</h4>
                <p>Income Tax Department tax-free institutional earnings certificate.</p>
              </div>
              <div style={styles.certCard}>
                <FileText size={32} color="#059669" />
                <h4>80G Donor Benefit</h4>
                <p>Provides 50% tax deduction eligibility to all individual & corporate donors.</p>
              </div>
              <div style={styles.certCard}>
                <Building size={32} color="#059669" />
                <h4>CSR-1 MCA Registration</h4>
                <p>Approved by Ministry of Corporate Affairs for corporate CSR fund allocation.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerCol}>
            <div style={styles.logoGroup}>
              <div style={styles.logoIcon}>
                <Heart color="#FFFFFF" size={20} fill="#FFFFFF" />
              </div>
              <h3 style={{ ...styles.logoTitle, color: '#FFF' }}>Mohammed Basheer Foundation</h3>
            </div>
            <p style={styles.footerText}>
              Providing 100% free hemodialysis and renal care to chronic kidney patients in Thiruvananthapuram through transparent, ethical reserve scaling.
            </p>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerHeading}>Registered Office</h4>
            <div style={styles.contactItem}>
              <MapPin size={16} color="#059669" style={{ marginRight: 8, flexShrink: 0 }} />
              <span>Thiruvananthapuram SRO Registered Address, Kerala, India</span>
            </div>
            <div style={styles.contactItem}>
              <Phone size={16} color="#059669" style={{ marginRight: 8, flexShrink: 0 }} />
              <span>+91 471 200 0000 / Patient Helpline</span>
            </div>
            <div style={styles.contactItem}>
              <Mail size={16} color="#059669" style={{ marginRight: 8, flexShrink: 0 }} />
              <span>contact@mohammedbasheer.org</span>
            </div>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerHeading}>Quick Navigation</h4>
            <div style={styles.footerLinks}>
              <button style={styles.footerLink} onClick={() => setActiveTab('home')}>Home</button>
              <button style={styles.footerLink} onClick={() => setActiveTab('dialysis')}>Free Dialysis Program</button>
              <button style={styles.footerLink} onClick={() => setActiveTab('apply')}>Patient Application</button>
              <button style={styles.footerLink} onClick={() => setActiveTab('donate')}>Donate & 80G Receipts</button>
              <button style={styles.footerLink} onClick={() => setActiveTab('transparency')}>Governance & Sec 11(5)</button>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p>© 2026 Mohammed Basheer Charitable Foundation. All Rights Reserved. SRO Thiruvananthapuram Registered Public Trust.</p>
        </div>
      </footer>
    </div>
  );
}

// INLINE STYLES OBJECT (Pure Vanilla CSS approach without Tailwind)
const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0F172A',
    borderBottom: '1px solid #1E293B',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#059669',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitle: {
    color: '#FFFFFF',
    fontSize: '1.1rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  logoSubtitle: {
    color: '#94A3B8',
    fontSize: '0.75rem',
  },
  navLinks: {
    display: 'flex',
    gap: 8,
  },
  navLink: {
    backgroundColor: 'transparent',
    color: '#94A3B8',
    padding: '8px 14px',
    borderRadius: 6,
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  navLinkActive: {
    backgroundColor: '#1E293B',
    color: '#38BDF8',
    padding: '8px 14px',
    borderRadius: 6,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  headerActions: {
    display: 'flex',
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: '#059669',
    color: '#FFFFFF',
    padding: '10px 18px',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondary: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: '10px 18px',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.9rem',
    border: '1px solid #334155',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#059669',
    border: '1px solid #059669',
    padding: '8px 16px',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  heroSection: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    padding: '60px 24px',
    borderBottom: '1px solid #1E293B',
  },
  heroContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  trustBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    border: '1px solid rgba(5, 150, 105, 0.3)',
    padding: '6px 12px',
    borderRadius: 20,
    width: 'fit-content',
  },
  trustBadgeText: {
    color: '#34D399',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  heroHeading: {
    fontSize: '2.5rem',
    fontWeight: 800,
    lineHeight: 1.25,
    color: '#F8FAFC',
  },
  heroSubheading: {
    color: '#94A3B8',
    fontSize: '1.05rem',
    lineHeight: 1.6,
  },
  heroCTAButtons: {
    display: 'flex',
    gap: 16,
    marginTop: 8,
  },
  btnHeroPrimary: {
    backgroundColor: '#059669',
    color: '#FFFFFF',
    padding: '14px 24px',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  btnHeroSecondary: {
    backgroundColor: 'transparent',
    color: '#F8FAFC',
    border: '1px solid #334155',
    padding: '14px 24px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '1rem',
  },
  heroLegalNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#64748B',
    fontSize: '0.85rem',
    marginTop: 4,
  },
  heroStatsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
    border: '1px solid #E2E8F0',
  },
  statsCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottom: '1px solid #E2E8F0',
    marginBottom: 20,
  },
  liveIndicator: {
    backgroundColor: '#DEF7EC',
    color: '#03543F',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: 12,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 10,
    border: '1px solid #F1F5F9',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#0F172A',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#64748B',
    marginTop: 2,
  },
  corpusBarContainer: {
    backgroundColor: '#F0FDF4',
    border: '1px solid #BBF7D0',
    borderRadius: 12,
    padding: 16,
  },
  corpusBarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: '#166534',
    marginBottom: 8,
  },
  corpusBarTrack: {
    height: 10,
    backgroundColor: '#DCFCE7',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  corpusBarFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 5,
  },
  corpusBarFootnote: {
    fontSize: '0.75rem',
    color: '#15803D',
  },
  pillarsSection: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '80px 24px',
  },
  sectionTitleBlock: {
    textAlign: 'center',
    maxWidth: 700,
    margin: '0 auto 48px auto',
  },
  sectionPretitle: {
    color: '#059669',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionDescription: {
    color: '#64748B',
    fontSize: '1rem',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  pillarCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  pillarIconBg: {
    width: 56,
    height: 56,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#0F172A',
  },
  pillarText: {
    color: '#64748B',
    fontSize: '0.9rem',
    lineHeight: 1.6,
  },
  pageContainer: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '48px 24px',
    width: '100%',
  },
  pageHeader: {
    marginBottom: 36,
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#0F172A',
  },
  pageSub: {
    color: '#64748B',
    fontSize: '1rem',
    marginTop: 4,
  },
  gridTwoColumn: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 36,
  },
  contentBlock: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    border: '1px solid #E2E8F0',
  },
  blockTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: 16,
  },
  paragraph: {
    color: '#475569',
    fontSize: '0.95rem',
    marginBottom: 16,
    lineHeight: 1.6,
  },
  checklistGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginTop: 24,
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#1E293B',
  },
  sidebarCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    border: '1px solid #E2E8F0',
    height: 'fit-content',
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: 12,
  },
  hospitalList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  hospitalListItem: {
    padding: '10px 12px',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    border: '1px solid #F1F5F9',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  hospitalTag: {
    fontSize: '0.75rem',
    color: '#059669',
    fontWeight: 600,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    border: '1px solid #E2E8F0',
    maxWidth: 700,
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  formHeader: {
    marginBottom: 24,
    textAlign: 'center',
  },
  stepperTrack: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 32,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 16,
  },
  stepActive: {
    color: '#059669',
    fontWeight: 700,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  stepInactive: {
    color: '#94A3B8',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  formRow: {
    display: 'flex',
    gap: 16,
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#334155',
  },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #CBD5E1',
    fontSize: '0.95rem',
    backgroundColor: '#FFFFFF',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  fileUploadBox: {
    border: '2px dashed #CBD5E1',
    borderRadius: 12,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
  },
  declarationBox: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
  },
  successState: {
    textAlign: 'center',
    padding: '24px 0',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#ECFDF5',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
  },
  successHeading: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#0F172A',
  },
  successSub: {
    color: '#64748B',
    marginTop: 8,
  },
  appIdBox: {
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 8,
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  donationGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: 32,
  },
  donationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    border: '1px solid #E2E8F0',
  },
  donationTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#0F172A',
  },
  donationSub: {
    color: '#64748B',
    fontSize: '0.9rem',
    marginBottom: 24,
  },
  tierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 20,
  },
  tierBox: {
    border: '2px solid #E2E8F0',
    borderRadius: 12,
    padding: 16,
    cursor: 'pointer',
    position: 'relative',
  },
  tierBoxActive: {
    border: '2px solid #059669',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    cursor: 'pointer',
    position: 'relative',
  },
  tierTag: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: '#059669',
    color: '#FFF',
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: 4,
  },
  tierAmount: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: '#0F172A',
  },
  tierLabel: {
    fontSize: '0.75rem',
    color: '#64748B',
    marginTop: 4,
  },
  taxToggleCard: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 10,
    padding: 16,
  },
  donationSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #E2E8F0',
  },
  summaryTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: 16,
  },
  impactBox: {
    display: 'flex',
    gap: 12,
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  guaranteeBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  badgeGroup: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  smallBadge: {
    backgroundColor: '#E2E8F0',
    color: '#334155',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: 4,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    border: '2px solid #059669',
  },
  receiptHeader: {
    textAlign: 'center',
    paddingBottom: 16,
    borderBottom: '1px dashed #CBD5E1',
    marginBottom: 16,
  },
  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: '0.9rem',
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ratioCardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginTop: 20,
  },
  ratioCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 10,
  },
  ratioPercent: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#059669',
  },
  ratioTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#0F172A',
    marginTop: 4,
  },
  ratioDesc: {
    fontSize: '0.8rem',
    color: '#64748B',
    marginTop: 4,
  },
  shariahList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  shariahItem: {
    display: 'flex',
    gap: 12,
  },
  regulatorySection: {
    marginTop: 48,
  },
  regulatoryHeading: {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },
  badgeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
  },
  certCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    backgroundColor: '#0F172A',
    color: '#94A3B8',
    marginTop: 'auto',
    borderTop: '1px solid #1E293B',
  },
  footerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '60px 24px',
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr 1fr',
    gap: 48,
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  footerText: {
    fontSize: '0.85rem',
    lineHeight: 1.6,
  },
  footerHeading: {
    color: '#FFFFFF',
    fontSize: '0.95rem',
    fontWeight: 700,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85rem',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
  },
  footerLink: {
    backgroundColor: 'transparent',
    color: '#94A3B8',
    fontSize: '0.85rem',
    padding: 0,
  },
  footerBottom: {
    borderTop: '1px solid #1E293B',
    padding: '20px 24px',
    textAlign: 'center',
    fontSize: '0.8rem',
  }
};