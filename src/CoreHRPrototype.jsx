import React, { useMemo, useState } from "react";
import {
  Users,
  Clock,
  FileText,
  Briefcase,
  Bell,
  Settings,
  Building2,
  GitPullRequest,
  BarChart3,
  MapPin,
  Network,
  CalendarDays,
  Timer,
  Shield,
  FolderOpen,
  Search,
  Download,
  Plus,
  ChevronRight,
  ChevronLeft,
  Banknote,
  CreditCard,
  Landmark,
  ReceiptText,
  DollarSign,
  FileSpreadsheet,
} from "lucide-react";

/**
 * CoreHR UAE Demo Prototype (Engineering-grade internal demo)
 * - Self-contained: NO shadcn/tailwind/aliases
 * - Navigable UI
 * - Required fields marked
 * - UAE compliance fields included (EID/Visa/Passport)
 * - Payroll Phase 2 readiness (IBAN, daily summaries, payroll lock concept)
 */

function Card({ children, className = "" }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}
function CardContent({ children, className = "" }) {
  return <div className={`content ${className}`.trim()}>{children}</div>;
}
function Button({ children, variant = "default", onClick, className = "", disabled }) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const cls = ["btn", isPrimary ? "primary" : "", isSecondary ? "" : "", className].join(" ").trim();
  return (
    <button className={cls} onClick={onClick} disabled={disabled} style={disabled ? { opacity: 0.6, cursor: "not-allowed" } : undefined}>
      {children}
    </button>
  );
}
function Input(props) {
  return <input {...props} className={`input ${props.className ?? ""}`.trim()} />;
}
function Badge({ children, tone = "outline" }) {
  const cls = ["badge", tone === "filled" ? "filled" : "", tone === "warn" ? "warn" : ""].join(" ").trim();
  return <span className={cls}>{children}</span>;
}

function Field({ label, required, hint, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div className="labelRow">
        <label className="label">
          {label}
          {required ? <span className="req"> *</span> : null}
        </label>
        {hint ? <span className="hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle, right }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{title}</div>
        {subtitle ? <div className="smallNote" style={{ marginTop: 4 }}>{subtitle}</div> : null}
      </div>
      {right ? <div style={{ display: "flex", gap: 8, alignItems: "center" }}>{right}</div> : null}
    </div>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={(e) => onChange?.(e.target.value)}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`tab ${active === t.key ? "active" : ""}`.trim()}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "organization", label: "Organization", icon: Building2 },
  { key: "branches", label: "Branches", icon: MapPin },
  { key: "masters", label: "Masters", icon: Network },
  { key: "employees", label: "Employees", icon: Users },
  { key: "onboarding", label: "Onboarding", icon: Briefcase },
  { key: "documents", label: "Documents", icon: FolderOpen },
  { key: "shifts", label: "Shifts", icon: Timer },
  { key: "roster", label: "Roster", icon: CalendarDays },
  { key: "attendance", label: "Attendance", icon: Clock },
  { key: "leave", label: "Leave", icon: FileText },
  { key: "overtime", label: "Overtime", icon: Timer },
  { key: "gratuity", label: "Gratuity", icon: DollarSign },
  { key: "salary", label: "Salary", icon: Banknote },
  { key: "payroll", label: "Payroll", icon: ReceiptText },
  { key: "wps", label: "WPS Export", icon: FileSpreadsheet },
  { key: "finalSettlement", label: "Final Settlement", icon: CreditCard },
  { key: "loans", label: "Loans", icon: Landmark },
  { key: "approvals", label: "Approvals", icon: GitPullRequest },
  { key: "reports", label: "Reports", icon: Download },
  { key: "security", label: "Security", icon: Shield },
  { key: "settings", label: "Settings", icon: Settings },
];

const EMIRATES = [
  "Abu Dhabi","Dubai","Sharjah","Ajman","Umm Al Quwain","Ras Al Khaimah","Fujairah",
];

const entityTypeOptions = [
  { value: "MAINLAND_MOHRE", label: "Mainland (MOHRE)" },
  { value: "FREE_ZONE", label: "Free Zone" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const leavePaidOptions = [
  { value: "PAID", label: "Paid" },
  { value: "UNPAID", label: "Unpaid" },
];

function RequiredLegend() {
  return <div className="legend">Fields marked <span className="req">*</span> are required.</div>;
}

export default function CoreHRPrototype() {
  const [page, setPage] = useState("dashboard");

  // subroutes
  const [employeeView, setEmployeeView] = useState("list"); // list | create | profile
  const [employeeProfileTab, setEmployeeProfileTab] = useState("personal");

  const [mastersTab, setMastersTab] = useState("departments");
  const [attendanceTab, setAttendanceTab] = useState("requests");
  const [leaveTab, setLeaveTab] = useState("types");
  const [reportTab, setReportTab] = useState("attendance");

  const [org, setOrg] = useState({
    companyName: "",
    companyEmail: "",
    entityType: "MAINLAND_MOHRE",
    mohreEstablishment: "",
    wpsApplicable: "YES",
    vatTrn: "",
    corporateTaxReg: "",
    country: "UAE",
    emirate: "Dubai",
    poBox: "",
    makani: "",
    timezone: "Asia/Dubai",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    weekendDays: ["Sat", "Sun"],
    wpsBankRoutingCode: "",
    wpsPayerReference: "",
    payrollCycle: "MONTHLY",
    payDayOfMonth: 30,
    attendanceLockRequired: true,
    payrollLockEnabled: true,
    gratuityFirst5YearDays: 21,
    gratuityAfter5YearDays: 30,
    gratuityCapYears: 2,
  });

  const [branches] = useState([
    { id: "BR-001", name: "Head Office", code: "HO", emirate: "Dubai", area: "Business Bay", street: "Marasi Dr", poBox: "12345", makani: "1234567890" },
    { id: "BR-002", name: "Sharjah Branch", code: "SHJ", emirate: "Sharjah", area: "Al Majaz", street: "Corniche", poBox: "", makani: "" },
  ]);

  const [departments] = useState([
    { id: "DEP-001", name: "Finance" },
    { id: "DEP-002", name: "HR" },
    { id: "DEP-003", name: "Operations" },
  ]);

  const [designations] = useState([
    { id: "DSG-001", name: "Accountant" },
    { id: "DSG-002", name: "HR Officer" },
    { id: "DSG-003", name: "Supervisor" },
  ]);

  const [visaTypes] = useState([
    { id: "VT-001", name: "Employment" },
    { id: "VT-002", name: "Investor" },
  ]);

  const [leaveTypes] = useState([
    { id: "LT-001", title: "Annual Leave", code: "AL", paid: "PAID", payrollDeductible: "NO", allowHalf: "YES" },
    { id: "LT-002", title: "Unpaid Leave", code: "UL", paid: "UNPAID", payrollDeductible: "YES", allowHalf: "YES" },
  ]);

  const [shifts] = useState([
    { id: "SH-001", name: "Morning", start: "09:00", end: "18:00", breakMin: 60, graceIn: 10, graceOut: 5, isDefault: true },
    { id: "SH-002", name: "Evening", start: "14:00", end: "23:00", breakMin: 60, graceIn: 10, graceOut: 5, isDefault: false },
  ]);


  // ===== Phase 2 (Enterprise Payroll) Data Model Placeholders =====
  // Salary components master (effective-dated employee assignments stored separately)
  const [salaryComponents] = useState([
    { id: "SC-BASIC", name: "Basic Salary", type: "EARNING", calc: "FIXED", wpsClass: "FIXED", taxable: false },
    { id: "SC-HOUSING", name: "Housing Allowance", type: "EARNING", calc: "FIXED", wpsClass: "FIXED", taxable: false },
    { id: "SC-TRANSPORT", name: "Transport Allowance", type: "EARNING", calc: "FIXED", wpsClass: "FIXED", taxable: false },
    { id: "SC-OTHER", name: "Other Allowance", type: "EARNING", calc: "FIXED", wpsClass: "FIXED", taxable: false },
    { id: "SC-OT", name: "Overtime", type: "EARNING", calc: "DERIVED", wpsClass: "VARIABLE", taxable: false },
    { id: "SC-UNPAID", name: "Unpaid Leave Deduction", type: "DEDUCTION", calc: "DERIVED", wpsClass: "N/A", taxable: false },
    { id: "SC-LOAN", name: "Loan Deduction", type: "DEDUCTION", calc: "FIXED", wpsClass: "N/A", taxable: false },
  ]);

  // Employee salary assignments (enterprise: effective-dated; prototype stores current snapshot + placeholders)
  const [employeeSalaryAssignments] = useState([
    { employeeId: "EMP001", componentId: "SC-BASIC", amount: 8000, effectiveFrom: "2024-01-01", effectiveTo: null },
    { employeeId: "EMP001", componentId: "SC-HOUSING", amount: 4000, effectiveFrom: "2024-01-01", effectiveTo: null },
    { employeeId: "EMP001", componentId: "SC-TRANSPORT", amount: 1000, effectiveFrom: "2024-01-01", effectiveTo: null },
  ]);

  // Payroll periods + lock states
  const [payrollPeriods, setPayrollPeriods] = useState([
    { id: "PP-2026-02", start: "2026-02-01", end: "2026-02-28", payMonth: 2, payYear: 2026, status: "DRAFT", lockedAt: null, lockedBy: null },
  ]);

  // Payroll results (per employee per period) - placeholder for Phase 2 engine output
  const [payrollResults] = useState([
    { periodId: "PP-2026-02", employeeId: "EMP001", daysWorked: 30, fixedAmount: 13000, variableAmount: 0, gross: 13000, deductions: 0, net: 13000, generatedAt: "2026-02-28T18:00:00Z" },
  ]);

  // Loans/advances - minimal enterprise-ready table for payroll deductions
  const [employeeLoans] = useState([
    { id: "LN-001", employeeId: "EMP001", totalAmount: 10000, installmentAmount: 1000, remainingBalance: 5000, startPeriodId: "PP-2026-01", status: "ACTIVE" },
  ]);

  // Final settlement - placeholder entity for Phase 2 termination processing
  const [finalSettlements] = useState([
    { id: "FS-001", employeeId: "EMP001", terminationDate: null, gratuityAmount: 0, leaveEncashmentAmount: 0, noticePayAmount: 0, otherEarnings: 0, otherDeductions: 0, totalPayable: 0, status: "DRAFT" },
  ]);


  const [employees, setEmployees] = useState([
    { id: "EMP001", code: "EMP001", name: "Ahmed Khan", department: "Finance", branch: "Head Office", status: "Active", visaExpiry: "2026-05-12", emiratesIdNo: "784199999999999", emiratesIdExpiry: "2027-02-01", iban: "AE070331234567890123456", shift: "Morning", joiningDate: "2024-01-01", probationEndDate: "2024-06-30", contractType: "Unlimited", noticePeriodDays: 30, payrollEligible: true, paymentMethod: "WPS", mohrePersonId: "123456789012345", laborCardNumber: "987654321012345", basicSalary: 8000, allowances: { housing: 4000, transport: 1000, other: 0 }, unpaidLeaveDaysTotal: 0, salaryStructureId: "SS-EMP001" },
    { id: "EMP002", code: "EMP002", name: "Sarah Ali", department: "HR", branch: "Head Office", status: "Probation", visaExpiry: "2026-03-05", emiratesIdNo: "784188888888888", emiratesIdExpiry: "2026-11-21", iban: "", shift: "Morning", joiningDate: "2024-01-01", probationEndDate: "2024-06-30", contractType: "Unlimited", noticePeriodDays: 30, payrollEligible: true, paymentMethod: "WPS", mohrePersonId: "123456789012345", laborCardNumber: "987654321012345", basicSalary: 8000, allowances: { housing: 4000, transport: 1000, other: 0 }, unpaidLeaveDaysTotal: 0, salaryStructureId: "SS-EMP001" },
  ]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("EMP001");

  const selectedEmployee = useMemo(
    () => employees.find((e) => e.id === selectedEmployeeId) || employees[0],
    [employees, selectedEmployeeId]
  );

  const [attendanceRequests] = useState([
    { id: "AR-1001", type: "Missed Check-In", employee: "EMP002 • Sarah Ali", requested: "2026-02-01 09:10", status: "PENDING" },
    { id: "AR-1002", type: "Work From Home", employee: "EMP001 • Ahmed Khan", requested: "2026-02-03 (Full Day)", status: "APPROVED" },
  ]);

  const [leaveRequests] = useState([
    { id: "LR-2001", employee: "EMP001 • Ahmed Khan", type: "Annual Leave", range: "2026-02-10 → 2026-02-12", days: 3, status: "PENDING" },
  ]);

  const [overtimeRequests] = useState([
    { id: "OT-3001", employee: "EMP001 • Ahmed Khan", date: "2026-02-07", dayType: "WEEKEND", minutes: 180, status: "PENDING" },
  ]);

  const [approvalsQueue, setApprovalsQueue] = useState([
    { id: "Q-1", type: "Attendance", ref: "AR-1001", who: "EMP002 • Sarah Ali", status: "PENDING" },
    { id: "Q-2", type: "Leave", ref: "LR-2001", who: "EMP001 • Ahmed Khan", status: "PENDING" },
    { id: "Q-3", type: "Overtime", ref: "OT-3001", who: "EMP001 • Ahmed Khan", status: "PENDING" },
  ]);

  const isMainland = org.entityType === "MAINLAND_MOHRE";

  function NavItem({ item }) {
    const Icon = item.icon;
    const active = page === item.key;
    return (
      <button
        className={`navBtn ${active ? "active" : ""}`.trim()}
        onClick={() => {
          setPage(item.key);
          if (item.key === "employees") {
            setEmployeeView("list");
            setEmployeeProfileTab("personal");
          }
        }}
      >
        <Icon size={18} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.label}
        </span>
      </button>
    );
  }

  function TopBar() {
    const title = NAV.find((n) => n.key === page)?.label ?? "";
    return (
      <div className="topbar">
        <div>
          <h2 className="h2">{title}</h2>
          <p className="subtitle">Dubai/UAE Core HR demo • English-only • Payroll Phase 2 ready (IBAN, components, summaries)</p>
        </div>
        <div className="actions">
          <Button variant="secondary">
            <Bell size={16} /> Alerts
          </Button>
          <Button variant="primary" onClick={() => { setPage("employees"); setEmployeeView("create"); }}>
            <Plus size={16} /> Add Employee
          </Button>
        </div>
      </div>
    );
  }

  function PageShell({ children }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {children}
        <div className="smallNote">Demo note: required fields are marked with <span className="req">*</span>.</div>
      </div>
    );
  }

  function Dashboard() {
    return (
      <PageShell>
        <div className="grid cols4">
          <Card><CardContent>
            <div className="smallNote">Total Employees</div>
            <p className="kpi">{employees.length}</p>
          </CardContent></Card>
          <Card><CardContent>
            <div className="smallNote">Pending Approvals</div>
            <p className="kpi">{approvalsQueue.filter((a) => a.status === "PENDING").length}</p>
          </CardContent></Card>
          <Card><CardContent>
            <div className="smallNote">Compliance Alerts</div>
            <p className="kpi" style={{ color: "var(--danger)" }}>4</p>
          </CardContent></Card>
          <Card><CardContent>
            <div className="smallNote">Payroll Readiness</div>
            <p className="kpi">{employees.filter((e) => !!e.iban).length}/{employees.length}</p>
            <div className="smallNote">Employees with IBAN captured</div>
          </CardContent></Card>
        </div>

        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader
              title="Quick Actions"
              subtitle="Demo flow: Setup Org → Add Branch → Create Employee → Onboard → Attendance/Leave → Approvals"
              right={
                <>
                  <Button variant="secondary" onClick={() => setPage("organization")}>
                    Go to Organization <ChevronRight size={16} />
                  </Button>
                  <Button variant="secondary" onClick={() => setPage("attendance")}>
                    Go to Attendance <ChevronRight size={16} />
                  </Button>
                </>
              }
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Pill>Timezone: Asia/Dubai</Pill>
              <Pill>WPS Applicable: {org.wpsApplicable}</Pill>
              <Pill>Entity: {org.entityType === "MAINLAND_MOHRE" ? "Mainland" : "Free Zone"}</Pill>
              <Pill>Working days: {org.workingDays.join(", ")}</Pill>
              <Pill>Weekends: {org.weekendDays.join(", ")}</Pill>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Organization() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionHeader
              title="Organization (Legal Entity)"
              subtitle="Required fields drive MOHRE/WPS compliance and Phase 2 payroll routing."
              right={<RequiredLegend />}
            />

            <div className="grid cols3">
              <Field label="Entity Type" required>
                <Select value={org.entityType} onChange={(v) => setOrg({ ...org, entityType: v })} placeholder="Select entity type" options={entityTypeOptions} />
              </Field>
              <Field label="Company Name" required>
                <Input value={org.companyName} onChange={(e) => setOrg({ ...org, companyName: e.target.value })} placeholder="Company name" />
              </Field>
              <Field label="Company Email" required>
                <Input value={org.companyEmail} onChange={(e) => setOrg({ ...org, companyEmail: e.target.value })} placeholder="hr@company.com" />
              </Field>

              <Field label="MOHRE Establishment Number" required={isMainland} hint={isMainland ? "Required for Mainland" : "Not required for Free Zone"}>
                <Input value={org.mohreEstablishment} onChange={(e) => setOrg({ ...org, mohreEstablishment: e.target.value })} placeholder="Enter establishment number" />
              </Field>

              <Field label="WPS Applicable" required>
                <Select value={org.wpsApplicable} onChange={(v) => setOrg({ ...org, wpsApplicable: v })} placeholder="Select" options={[{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }]} />
              </Field>


              <Field label="WPS Bank Routing Code" required={org.wpsApplicable === "YES"} hint="Provided by bank/exchange house">
                <Input
                  value={org.wpsBankRoutingCode}
                  onChange={(e) => setOrg({ ...org, wpsBankRoutingCode: e.target.value })}
                  placeholder="e.g., 033"
                />
              </Field>

              <Field label="Payroll Cycle" required hint="Phase 2 payroll setting">
                <Select
                  value={org.payrollCycle}
                  onChange={(v) => setOrg({ ...org, payrollCycle: v })}
                  placeholder="Select"
                  options={[
                    { value: "MONTHLY", label: "Monthly" },
                    { value: "BIWEEKLY", label: "Biweekly" },
                    { value: "WEEKLY", label: "Weekly" },
                  ]}
                />
              </Field>

              <Field label="Pay Day of Month" required hint="1-31 (Month-end supported)">
                <Input
                  type="number"
                  value={org.payDayOfMonth}
                  onChange={(e) => setOrg({ ...org, payDayOfMonth: Number(e.target.value) })}
                  placeholder="30"
                />
              </Field>

              <Field label="Default Timezone" required hint="Fixed for UAE">
                <Input value={org.timezone} readOnly />
              </Field>

              <Field label="VAT TRN" hint="15 digits (optional)">
                <Input value={org.vatTrn} onChange={(e) => setOrg({ ...org, vatTrn: e.target.value })} placeholder="123456789012345" />
              </Field>

              <Field label="Corporate Tax Registration" hint="Optional">
                <Input value={org.corporateTaxReg} onChange={(e) => setOrg({ ...org, corporateTaxReg: e.target.value })} placeholder="EmaraTax ref" />
              </Field>
            </div>

            <Card className="sm">
              <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <SectionHeader title="UAE Address" subtitle="Supports UAE emirates + Dubai Makani." />
                <div className="grid cols3">
                  <Field label="Country" required><Input value={org.country} readOnly /></Field>
                  <Field label="Emirate" required>
                    <Select value={org.emirate} onChange={(v) => setOrg({ ...org, emirate: v })} placeholder="Select emirate" options={EMIRATES.map((e) => ({ value: e, label: e }))} />
                  </Field>
                  <Field label="P.O. Box" hint="Optional"><Input value={org.poBox} onChange={(e) => setOrg({ ...org, poBox: e.target.value })} placeholder="e.g., 12345" /></Field>
                  <Field label="Makani Number" hint="Dubai only; 10 digits (optional)"><Input value={org.makani} onChange={(e) => setOrg({ ...org, makani: e.target.value })} placeholder="1234567890" /></Field>
                </div>
              </CardContent>
            </Card>

            <Card className="sm">
              <CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SectionHeader title="Working Week" subtitle="Do not hardcode weekends; configure per entity." />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <Badge key={d}>{d}</Badge>)}
                </div>
                <div className="smallNote">Current demo: Working days = {org.workingDays.join(", ")} • Weekends = {org.weekendDays.join(", ")}</div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Branches() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader
              title="Branches"
              subtitle="Branch captures emirate + optional Makani (Dubai) and supports future payroll routing."
              right={<Button variant="primary"><Plus size={16} /> New Branch</Button>}
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Search size={16} color="#94a3b8" />
              <Input placeholder="Search branches..." style={{ maxWidth: 320 }} />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Code</th><th>Name</th><th>Emirate</th><th>Area</th><th>Makani</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((b) => (
                  <tr key={b.id} className="rowHover">
                    <td>{b.code}</td><td>{b.name}</td><td>{b.emirate}</td><td>{b.area}</td><td>{b.makani || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="New Branch (Fields Required)" right={<RequiredLegend />} />
            <div className="grid cols3">
              <Field label="Branch Name" required><Input placeholder="e.g., Head Office" /></Field>
              <Field label="Branch Code" required hint="Unique"><Input placeholder="e.g., HO" /></Field>
              <Field label="Emirate" required>
                <Select value={"Dubai"} onChange={() => {}} placeholder="Select emirate" options={EMIRATES.map((e) => ({ value: e, label: e }))} />
              </Field>
              <Field label="Area" required><Input placeholder="e.g., Business Bay" /></Field>
              <Field label="Street" hint="Optional"><Input placeholder="Street name" /></Field>
              <Field label="P.O. Box" hint="Optional"><Input placeholder="12345" /></Field>
              <Field label="Makani Number" hint="Dubai only; 10 digits (optional)"><Input placeholder="1234567890" /></Field>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Masters() {
    const tabs = [
      { key: "departments", label: "Departments" },
      { key: "designations", label: "Designations" },
      { key: "visaTypes", label: "Visa Types" },
    ];

    const data =
      mastersTab === "departments" ? departments :
      mastersTab === "designations" ? designations :
      visaTypes;

    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Masters" subtitle="CRUD lists used across HR workflows." />
            <Tabs tabs={tabs} active={mastersTab} onChange={setMastersTab} />

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Input placeholder={`Search ${mastersTab}...`} style={{ maxWidth: 320 }} />
              <Button variant="primary"><Plus size={16} /> Add</Button>
            </div>

            <table className="table">
              <thead><tr><th>ID</th><th>Name</th></tr></thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id} className="rowHover">
                    <td>{d.id}</td><td>{d.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Add Item (Fields Required)" right={<RequiredLegend />} />
            <div className="grid cols3">
              <Field label="Name" required><Input placeholder="Enter name" /></Field>
              <Field label="Status" required>
                <Select value={"ACTIVE"} onChange={() => {}} placeholder="Select" options={[{ value: "ACTIVE", label: "Active" }, { value: "INACTIVE", label: "Inactive" }]} />
              </Field>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Employees() {
    const tabs = [
      { key: "list", label: "Directory" },
      { key: "create", label: "Create Employee" },
    ];

    function Directory() {
      return (
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader
              title="Employee Directory"
              subtitle="Click an employee to open profile."
              right={<Button variant="secondary"><Download size={16} /> Export</Button>}
            />

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Search size={16} color="#94a3b8" />
              <Input placeholder="Search employees..." style={{ maxWidth: 320 }} />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Emp Code</th><th>Name</th><th>Branch</th><th>Department</th><th>Status</th><th>Visa Expiry</th><th>IBAN</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr
                    key={e.id}
                    className="rowHover"
                    style={{ cursor: "pointer" }}
                    onClick={() => { setSelectedEmployeeId(e.id); setEmployeeView("profile"); setEmployeeProfileTab("personal"); }}
                  >
                    <td>{e.code}</td>
                    <td>{e.name}</td>
                    <td>{e.branch}</td>
                    <td>{e.department}</td>
                    <td><Badge tone={e.status === "Active" ? "filled" : "outline"}>{e.status}</Badge></td>
                    <td style={e.visaExpiry !== "—" && e.visaExpiry < "2026-04-01" ? { color: "var(--danger)" } : undefined}>{e.visaExpiry}</td>
                    <td>{e.iban ? "✅" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      );
    }

    function CreateEmployee() {
      const [draft, setDraft] = useState({
        organization: "",
        employeeCode: "(auto)",
        biometricId: "",
        firstName: "",
        lastName: "",
        gender: "",
        nationality: "",
        mobile: "",
        officialEmail: "",
        joiningDate: "",
        branch: "",
        department: "",
        designation: "",
        lineManager: "",
        shift: "",
        emiratesIdNo: "",
        emiratesIdExpiry: "",
        passportNo: "",
        passportExpiry: "",
        visaType: "",
        visaNo: "",
        visaExpiry: "",
        iban: "",
        paymentMethod: "WPS",
        payrollEligible: true,
        mohrePersonId: "",
        laborCardNumber: "",
        contractType: "Unlimited",
        probationEndDate: "",
        noticePeriodDays: 30,
        basicSalary: "",
        housingAllowance: "",
        transportAllowance: "",
        otherAllowance: "",
      });

      const saveDemo = () => {
        const newId = `EMP${String(employees.length + 1).padStart(3, "0")}`;
        const newEmp = {
          id: newId,
          code: newId,
          name: `${draft.firstName || "New"} ${draft.lastName || "Employee"}`,
          department: draft.department || "—",
          branch: draft.branch || "—",
          status: "Active",
          visaExpiry: draft.visaExpiry || "—",
          emiratesIdNo: draft.emiratesIdNo,
          emiratesIdExpiry: draft.emiratesIdExpiry,
          iban: draft.iban,
          shift: draft.shift || "—",

          joiningDate: draft.joiningDate || "—",
          probationEndDate: draft.probationEndDate || "",
          contractType: draft.contractType,
          noticePeriodDays: Number(draft.noticePeriodDays || 30),
          payrollEligible: !!draft.payrollEligible,
          paymentMethod: draft.paymentMethod,
          mohrePersonId: draft.mohrePersonId,
          laborCardNumber: draft.laborCardNumber,
          basicSalary: Number(draft.basicSalary || 0),
          allowances: {
            housing: Number(draft.housingAllowance || 0),
            transport: Number(draft.transportAllowance || 0),
            other: Number(draft.otherAllowance || 0),
          },
          unpaidLeaveDaysTotal: 0,
          salaryStructureId: `SS-${newId}`,
        };
        setEmployees([newEmp, ...employees]);
        setSelectedEmployeeId(newId);
        setEmployeeView("profile");
      };

      return (
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionHeader
              title="Create Employee"
              subtitle="UAE compliance requires Emirates ID + Visa/Passport expiry tracking; Phase 2 needs IBAN + salary components."
              right={
                <>
                  <Button variant="secondary" onClick={() => setEmployeeView("list")}>Cancel</Button>
                  <Button variant="primary" onClick={saveDemo}>Save</Button>
                </>
              }
            />
            <RequiredLegend />

            <div className="grid cols3">
              <Field label="Organization" required>
                <Input value={draft.organization} onChange={(e) => setDraft({ ...draft, organization: e.target.value })} placeholder="Select organization" />
              </Field>
              <Field label="Employee Code" required hint="Auto-increment"><Input value={draft.employeeCode} readOnly /></Field>
              <Field label="Biometric ID" hint="Optional">
                <Input value={draft.biometricId} onChange={(e) => setDraft({ ...draft, biometricId: e.target.value })} placeholder="e.g., 12345" />
              </Field>

              <Field label="First Name" required><Input value={draft.firstName} onChange={(e) => setDraft({ ...draft, firstName: e.target.value })} placeholder="First name" /></Field>
              <Field label="Last Name" required><Input value={draft.lastName} onChange={(e) => setDraft({ ...draft, lastName: e.target.value })} placeholder="Last name" /></Field>
              <Field label="Gender" required>
                <Select value={draft.gender} onChange={(v) => setDraft({ ...draft, gender: v })} placeholder="Select gender" options={genderOptions} />
              </Field>

              <Field label="Nationality" required><Input value={draft.nationality} onChange={(e) => setDraft({ ...draft, nationality: e.target.value })} placeholder="e.g., AE, IN, PH" /></Field>
              <Field label="Mobile" required hint="Normalize to +971..."><Input value={draft.mobile} onChange={(e) => setDraft({ ...draft, mobile: e.target.value })} placeholder="+9715xxxxxxxx" /></Field>
              <Field label="Official Email" required><Input value={draft.officialEmail} onChange={(e) => setDraft({ ...draft, officialEmail: e.target.value })} placeholder="name@company.com" /></Field>

              <Field label="Joining Date" required><Input type="date" value={draft.joiningDate} onChange={(e) => setDraft({ ...draft, joiningDate: e.target.value })} /></Field>
              <Field label="Contract Type" required><select value={draft.contractType} onChange={(e) => setDraft({ ...draft, contractType: e.target.value })} className="input"><option value="Unlimited">Unlimited</option><option value="Limited">Limited (Fixed Term)</option></select></Field>
              <Field label="Probation End Date" hint="Optional"><Input type="date" value={draft.probationEndDate} onChange={(e) => setDraft({ ...draft, probationEndDate: e.target.value })} /></Field>
              <Field label="Notice Period (Days)" required hint="Company policy / contract"><Input type="number" value={draft.noticePeriodDays} onChange={(e) => setDraft({ ...draft, noticePeriodDays: e.target.value })} placeholder="30" /></Field>
              <Field label="Branch" required><Input value={draft.branch} onChange={(e) => setDraft({ ...draft, branch: e.target.value })} placeholder="Select branch" /></Field>
              <Field label="Department" required><Input value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })} placeholder="Select department" /></Field>

              <Field label="Designation" hint="Optional"><Input value={draft.designation} onChange={(e) => setDraft({ ...draft, designation: e.target.value })} placeholder="Select designation" /></Field>
              <Field label="Line Manager" required><Input value={draft.lineManager} onChange={(e) => setDraft({ ...draft, lineManager: e.target.value })} placeholder="Select manager" /></Field>
              <Field label="Shift" required><Input value={draft.shift} onChange={(e) => setDraft({ ...draft, shift: e.target.value })} placeholder="Select shift" /></Field>
            </div>

            <div className="grid cols3">
              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>UAE Identity (Required)</div>
                <Field label="Emirates ID Number" required hint="15 digits">
                  <Input value={draft.emiratesIdNo} onChange={(e) => setDraft({ ...draft, emiratesIdNo: e.target.value })} placeholder="784xxxxxxxxxxxxxx" />
                </Field>
                <Field label="Emirates ID Expiry" required>
                  <Input type="date" value={draft.emiratesIdExpiry} onChange={(e) => setDraft({ ...draft, emiratesIdExpiry: e.target.value })} />
                </Field>
              </CardContent></Card>

              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>Visa & Passport (Required)</div>
                <Field label="Passport Number" required><Input value={draft.passportNo} onChange={(e) => setDraft({ ...draft, passportNo: e.target.value })} placeholder="Passport no." /></Field>
                <Field label="Passport Expiry" required><Input type="date" value={draft.passportExpiry} onChange={(e) => setDraft({ ...draft, passportExpiry: e.target.value })} /></Field>
                <Field label="Visa Type" required><Input value={draft.visaType} onChange={(e) => setDraft({ ...draft, visaType: e.target.value })} placeholder="Employment" /></Field>
                <Field label="Visa Number" required><Input value={draft.visaNo} onChange={(e) => setDraft({ ...draft, visaNo: e.target.value })} placeholder="Visa no." /></Field>
                <Field label="Visa Expiry" required><Input type="date" value={draft.visaExpiry} onChange={(e) => setDraft({ ...draft, visaExpiry: e.target.value })} /></Field>
              </CardContent></Card>

              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>Bank (Phase 2 Ready)</div>
                <Field label="IBAN" required hint="AE + 21 digits">
                  <Input value={draft.iban} onChange={(e) => setDraft({ ...draft, iban: e.target.value })} placeholder="AE00xxxxxxxxxxxxxxxxxxxxx" />
                
                <Field label="Payment Method" required hint="Phase 2">
                  <select
                    value={draft.paymentMethod}
                    onChange={(e) => setDraft({ ...draft, paymentMethod: e.target.value })}
                    className="input"
                  >
                    <option value="WPS">WPS</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="CASH">Cash</option>
                  </select>
                </Field>

                <Field label="Payroll Eligible" required hint="Controls payroll inclusion">
                  <select
                    value={draft.payrollEligible ? "YES" : "NO"}
                    onChange={(e) => setDraft({ ...draft, payrollEligible: e.target.value === "YES" })}
                    className="input"
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </select>
                </Field>

                <Field label="MOHRE Person ID / MOL ID" required hint="Required for WPS (Mainland)">
                  <Input
                    value={draft.mohrePersonId}
                    onChange={(e) => setDraft({ ...draft, mohrePersonId: e.target.value })}
                    placeholder="Enter MOHRE person/labour ID"
                  />
                </Field>

                <Field label="Labour Card Number" hint="If applicable">
                  <Input
                    value={draft.laborCardNumber}
                    onChange={(e) => setDraft({ ...draft, laborCardNumber: e.target.value })}
                    placeholder="Enter labour card number"
                  />
                </Field>

                <div style={{ marginTop: 10, fontWeight: 700 }}>Salary (Phase 2 Ready)</div>
                <Field label="Basic Salary (AED)" required hint="Gratuity & WPS base">
                  <Input
                    type="number"
                    value={draft.basicSalary}
                    onChange={(e) => setDraft({ ...draft, basicSalary: e.target.value })}
                    placeholder="8000"
                  />
                </Field>

                <Field label="Housing Allowance (AED)" hint="Fixed earnings (WPS Fixed)">
                  <Input
                    type="number"
                    value={draft.housingAllowance}
                    onChange={(e) => setDraft({ ...draft, housingAllowance: e.target.value })}
                    placeholder="4000"
                  />
                </Field>

                <Field label="Transport Allowance (AED)" hint="Fixed earnings (WPS Fixed)">
                  <Input
                    type="number"
                    value={draft.transportAllowance}
                    onChange={(e) => setDraft({ ...draft, transportAllowance: e.target.value })}
                    placeholder="1000"
                  />
                </Field>

                <Field label="Other Allowance (AED)" hint="Fixed earnings (WPS Fixed)">
                  <Input
                    type="number"
                    value={draft.otherAllowance}
                    onChange={(e) => setDraft({ ...draft, otherAllowance: e.target.value })}
                    placeholder="0"
                  />
                </Field>
</Field>
                <div className="smallNote">Capturing IBAN now avoids schema changes when WPS/payroll launches.</div>
              </CardContent></Card>
            </div>

            <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontWeight: 800 }}>Phase 2 Payroll Placeholders (stored, not calculated)</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", fontSize: 13, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Salary components: Basic + Allowances (effective-dated)</li>
                <li>WPS eligibility/status per employee</li>
                <li>Payroll lock for attendance month close</li>
              </ul>
            </CardContent></Card>
          </CardContent>
        </Card>
      );
    }

    function Profile() {
      const tabs = [
        { key: "personal", label: "Personal" },
        { key: "employment", label: "Employment" },
        { key: "compliance", label: "Compliance" },
        { key: "bank", label: "Bank" },
        { key: "attendance", label: "Attendance Summary" },
      ];

      return (
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader
              title={`Employee Profile • ${selectedEmployee.code}`}
              subtitle={selectedEmployee.name}
              right={
                <Button variant="secondary" onClick={() => setEmployeeView("list")}>
                  <ChevronLeft size={16} /> Back to Directory
                </Button>
              }
            />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Pill>Branch: {selectedEmployee.branch}</Pill>
              <Pill>Dept: {selectedEmployee.department}</Pill>
              <Pill>Status: {selectedEmployee.status}</Pill>
              <Pill>Shift: {selectedEmployee.shift}</Pill>
            </div>

            <Tabs tabs={tabs} active={employeeProfileTab} onChange={setEmployeeProfileTab} />

            {employeeProfileTab === "personal" ? (
              <div className="grid cols3">
                <Card className="sm"><CardContent><div className="smallNote">Mobile</div><div style={{ fontWeight: 800 }}>+9715xxxxxxx</div></CardContent></Card>
                <Card className="sm"><CardContent><div className="smallNote">Email</div><div style={{ fontWeight: 800 }}>name@company.com</div></CardContent></Card>
                <Card className="sm"><CardContent><div className="smallNote">Nationality</div><div style={{ fontWeight: 800 }}>—</div></CardContent></Card>
              </div>
            ) : null}

            {employeeProfileTab === "employment" ? (
              <Card className="sm">
                <CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontWeight: 800 }}>Employment Terms (effective-dated) • Phase 2 Ready</div>
                  <div className="smallNote">Store contract/probation and any changes as effective-dated records (no overwrites).</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <Badge>Contract Type: Fixed term</Badge>
                    <Badge>Probation: 6 months (verify policy)</Badge>
                    <Badge>Effective From: 2026-01-01</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {employeeProfileTab === "compliance" ? (
              <div className="grid cols3">
                <Card className="sm"><CardContent>
                  <div className="smallNote">Emirates ID</div>
                  <div style={{ fontWeight: 800 }}>{selectedEmployee.emiratesIdNo}</div>
                  <div className="smallNote" style={{ marginTop: 6 }}>Expiry: {selectedEmployee.emiratesIdExpiry}</div>
                </CardContent></Card>
                <Card className="sm"><CardContent>
                  <div className="smallNote">Visa Expiry</div>
                  <div style={{ fontWeight: 800 }}>{selectedEmployee.visaExpiry}</div>
                  <div className="smallNote" style={{ marginTop: 6 }}>Alerts: 30/15/7 days configurable</div>
                </CardContent></Card>
                <Card className="sm"><CardContent>
                  <div className="smallNote">Documents</div>
                  <div style={{ fontWeight: 800 }}>EID (Front/Back) • Visa • Passport</div>
                </CardContent></Card>
              </div>
            ) : null}

            {employeeProfileTab === "bank" ? (
              <Card className="sm">
                <CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontWeight: 800 }}>Bank & WPS (Phase 2)</div>
                  <div className="smallNote">IBAN captured now enables WPS payroll later.</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <Badge tone={selectedEmployee.iban ? "filled" : "outline"}>IBAN: {selectedEmployee.iban ? "Present" : "Missing"}</Badge>
                    <Badge>WPS Status: Pending</Badge>
                    <Badge>Payment Method: WPS</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {employeeProfileTab === "attendance" ? (
              <Card className="sm">
                <CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontWeight: 800 }}>Monthly Payroll Input Preview (from daily_attendance_summary)</div>
                  <div className="grid cols3">
                    <Card className="sm"><CardContent><div className="smallNote">Worked</div><div style={{ fontWeight: 800 }}>168h</div></CardContent></Card>
                    <Card className="sm"><CardContent><div className="smallNote">OT (Workday)</div><div style={{ fontWeight: 800 }}>6h</div></CardContent></Card>
                    <Card className="sm"><CardContent><div className="smallNote">OT (Weekend)</div><div style={{ fontWeight: 800 }}>0h</div></CardContent></Card>
                    <Card className="sm"><CardContent><div className="smallNote">Holiday Work</div><div style={{ fontWeight: 800 }}>0h</div></CardContent></Card>
                    <Card className="sm"><CardContent><div className="smallNote">Unpaid Leave</div><div style={{ fontWeight: 800 }}>0d</div></CardContent></Card>
                    <Card className="sm"><CardContent><div className="smallNote">Absence</div><div style={{ fontWeight: 800 }}>0d</div></CardContent></Card>
                  </div>
                  <div><Badge>Payroll Lock: Open</Badge></div>
                </CardContent>
              </Card>
            ) : null}
          </CardContent>
        </Card>
      );
    }

    return (
      <PageShell>
        <Tabs tabs={tabs} active={employeeView} onChange={setEmployeeView} />
        {employeeView === "list" ? <Directory /> : null}
        {employeeView === "create" ? <CreateEmployee /> : null}
        {employeeView === "profile" ? <Profile /> : null}
      </PageShell>
    );
  }

  function Onboarding() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Onboarding (UAE)" subtitle="Gated checklist: Activate Employee vs Activate Payroll (Phase 2)." right={<RequiredLegend />} />
            <div className="grid cols2">
              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontWeight: 800 }}>Required to Activate Employee</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li>Offer/contract uploaded <span className="req">*</span></li>
                  <li>Visa status = Visa Issued <span className="req">*</span></li>
                  <li>Emirates ID number + expiry captured <span className="req">*</span></li>
                  <li>Passport expiry captured <span className="req">*</span></li>
                  <li>Shift assigned <span className="req">*</span></li>
                </ul>
              </CardContent></Card>
              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontWeight: 800 }}>Required to Activate Payroll (Phase 2)</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li>IBAN captured + validated <span className="req">*</span></li>
                  <li>Salary components stored (Basic + Allowances) <span className="req">*</span></li>
                  <li>Employment terms active (effective-dated) <span className="req">*</span></li>
                  <li>Attendance daily summaries exist for pay period <span className="req">*</span></li>
                  <li>Payroll lock executed at month close <span className="req">*</span></li>
                </ul>
              </CardContent></Card>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Documents() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Document Center" subtitle="Employee documents with expiry alerts (EID/Visa/Passport/Insurance)." right={<Button variant="primary"><Plus size={16} /> Upload</Button>} />
            <div className="grid cols3">
              <Card className="sm"><CardContent><div className="smallNote">Required document types</div><div style={{ fontWeight: 800 }}>Emirates ID • Visa • Passport</div></CardContent></Card>
              <Card className="sm"><CardContent><div className="smallNote">File rules</div><div style={{ fontWeight: 800 }}>PDF/JPG/PNG • max 5MB</div></CardContent></Card>
              <Card className="sm"><CardContent><div className="smallNote">Alert policy</div><div style={{ fontWeight: 800 }}>30/15/7 days (configurable)</div></CardContent></Card>
            </div>
            <table className="table">
              <thead><tr><th>Employee</th><th>Document</th><th>Expiry</th><th>Status</th></tr></thead>
              <tbody>
                <tr className="rowHover"><td>EMP001 • Ahmed Khan</td><td>Emirates ID (Front/Back)</td><td>2027-02-01</td><td><Badge tone="filled">Valid</Badge></td></tr>
                <tr className="rowHover"><td>EMP002 • Sarah Ali</td><td>Visa</td><td style={{ color: "var(--danger)" }}>2026-03-05</td><td><Badge tone="warn">Expiring</Badge></td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Shifts() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Shift Templates" subtitle="Shifts define scheduled minutes for attendance and later payroll calculations." right={<Button variant="primary"><Plus size={16} /> New Shift</Button>} />
            <table className="table">
              <thead><tr><th>Name</th><th>Start</th><th>End</th><th>Break</th><th>Grace In/Out</th><th>Default</th></tr></thead>
              <tbody>
                {shifts.map((s) => (
                  <tr key={s.id} className="rowHover">
                    <td>{s.name}</td><td>{s.start}</td><td>{s.end}</td><td>{s.breakMin}m</td><td>{s.graceIn}m / {s.graceOut}m</td><td>{s.isDefault ? "✅" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Create Shift (Fields Required)" subtitle="Supports seasonal/Ramadan shifts via effective date ranges (optional)." right={<RequiredLegend />} />
            <div className="grid cols3">
              <Field label="Shift Name" required><Input placeholder="e.g., Morning" /></Field>
              <Field label="Start Time" required><Input type="time" /></Field>
              <Field label="End Time" required><Input type="time" /></Field>
              <Field label="Break Minutes" hint="Optional"><Input placeholder="60" /></Field>
              <Field label="Grace In Minutes" hint="Optional"><Input placeholder="10" /></Field>
              <Field label="Grace Out Minutes" hint="Optional"><Input placeholder="5" /></Field>
              <Field label="Is Default" hint="Optional">
                <Select value={"NO"} onChange={() => {}} placeholder="Select" options={[{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }]} />
              </Field>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Roster() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Roster (Shift Overrides)" subtitle="Roster overrides default shift for a date range; essential for payroll accuracy." right={<Button variant="primary"><Plus size={16} /> Assign Roster</Button>} />
            <div className="grid cols4">
              <Field label="Organization" required><Input placeholder="Select organization" /></Field>
              <Field label="Sub-Department" hint="Optional"><Input placeholder="Select sub-department" /></Field>
              <Field label="Start Date" required><Input type="date" /></Field>
              <Field label="End Date" required><Input type="date" /></Field>
            </div>
            <table className="table">
              <thead><tr><th>Employee</th><th>Date Range</th><th>Shift</th><th>Notes</th></tr></thead>
              <tbody>
                <tr className="rowHover"><td>EMP001 • Ahmed Khan</td><td>2026-02-01 → 2026-02-07</td><td>Evening</td><td>Project coverage</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Attendance() {
    const tabs = [
      { key: "requests", label: "Requests" },
      { key: "daily", label: "Daily Report" },
      { key: "monthly", label: "Monthly Summary" },
      { key: "calendar", label: "Calendar" },
    ];

    return (
      <PageShell>
        <Tabs tabs={tabs} active={attendanceTab} onChange={setAttendanceTab} />

        {attendanceTab === "requests" ? (
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionHeader title="Attendance Requests" subtitle="Requests are approval-controlled; approved changes feed daily summaries (not raw punches)." right={<Button variant="primary"><Plus size={16} /> New Request</Button>} />
              <table className="table">
                <thead><tr><th>Type</th><th>Employee</th><th>Requested</th><th>Status</th></tr></thead>
                <tbody>
                  {attendanceRequests.map((r) => (
                    <tr key={r.id} className="rowHover">
                      <td>{r.type}</td><td>{r.employee}</td><td>{r.requested}</td>
                      <td><Badge tone={r.status === "APPROVED" ? "filled" : "outline"}>{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontWeight: 800 }}>Payroll-ready Output (required for Phase 2)</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li>Day Type (Workday / Weekend / Public Holiday / Ramadan)</li>
                  <li>Scheduled minutes + worked minutes</li>
                  <li>OT minutes split by category</li>
                  <li>Payroll lock flag for month close</li>
                </ul>
              </CardContent></Card>
            </CardContent>
          </Card>
        ) : null}

        {attendanceTab === "daily" ? (
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionHeader title="Daily Attendance Report" subtitle="All times in Asia/Dubai. Day Type included for payroll audit." right={<Button variant="secondary"><Download size={16} /> Export</Button>} />
              <div className="grid cols4">
                <Field label="From" required><Input type="date" /></Field>
                <Field label="To" required><Input type="date" /></Field>
                <Field label="Branch" hint="Optional"><Input placeholder="All" /></Field>
                <Field label="Employee" hint="Optional"><Input placeholder="All" /></Field>
              </div>
              <table className="table">
                <thead><tr><th>Emp</th><th>Date</th><th>Day Type</th><th>Scheduled</th><th>Worked</th><th>OT</th><th>Status</th></tr></thead>
                <tbody>
                  <tr className="rowHover"><td>EMP001</td><td>2026-02-01</td><td>WORKING_DAY</td><td>09:00–18:00</td><td>09:02–18:10</td><td>10m</td><td><Badge tone="filled">Present</Badge></td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        ) : null}

        {attendanceTab === "monthly" ? (
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionHeader title="Monthly Attendance Summary (Payroll Input)" subtitle="This is what payroll should consume (not punches)." right={<Badge>Payroll Lock: Open</Badge>} />
              <table className="table">
                <thead><tr><th>Emp</th><th>Worked</th><th>OT (Workday)</th><th>OT (Weekend)</th><th>Holiday Work</th><th>Unpaid Leave</th><th>Absence</th></tr></thead>
                <tbody>
                  <tr className="rowHover"><td>EMP001</td><td>168h</td><td>6h</td><td>0h</td><td>0h</td><td>0d</td><td>0d</td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        ) : null}

        {attendanceTab === "calendar" ? (
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SectionHeader title="Attendance Calendar" subtitle="Shows day markers (P/A/L/H/D). Includes holiday/weekend context." />
              <div className="smallNote">Demo placeholder: calendar view would be rendered here with legend and quick actions.</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Badge>P = Present</Badge><Badge>A = Absent</Badge><Badge>L = Leave</Badge><Badge>H = Public Holiday</Badge><Badge>D = Day off</Badge>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </PageShell>
    );
  }

  function Leave() {
    const tabs = [
      { key: "types", label: "Leave Types" },
      { key: "requests", label: "Leave Requests" },
      { key: "summary", label: "Summaries" },
    ];

    return (
      <PageShell>
        <Tabs tabs={tabs} active={leaveTab} onChange={setLeaveTab} />

        {leaveTab === "types" ? (
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionHeader title="Leave Types" subtitle="Each leave type must be payroll-aware (paid/unpaid + deductible flag)." right={<Button variant="primary"><Plus size={16} /> New Leave Type</Button>} />
              <table className="table">
                <thead><tr><th>Code</th><th>Title</th><th>Paid</th><th>Payroll Deductible</th><th>Half Leave</th></tr></thead>
                <tbody>
                  {leaveTypes.map((lt) => (
                    <tr key={lt.id} className="rowHover">
                      <td>{lt.code}</td><td>{lt.title}</td><td>{lt.paid}</td><td>{lt.payrollDeductible}</td><td>{lt.allowHalf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SectionHeader title="Create Leave Type (Fields Required)" right={<RequiredLegend />} />
                <div className="grid cols3">
                  <Field label="Title" required><Input placeholder="e.g., Annual Leave" /></Field>
                  <Field label="Code" required hint="Unique"><Input placeholder="e.g., AL" /></Field>
                  <Field label="Paid/Unpaid" required><Select value={"PAID"} onChange={() => {}} placeholder="Select" options={leavePaidOptions} /></Field>
                  <Field label="Payroll Deductible" required hint="For unpaid leave">
                    <Select value={"NO"} onChange={() => {}} placeholder="Select" options={[{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }]} />
                  </Field>
                  <Field label="Enable Half Leave" hint="Optional">
                    <Select value={"YES"} onChange={() => {}} placeholder="Select" options={[{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }]} />
                  </Field>
                </div>
              </CardContent></Card>
            </CardContent>
          </Card>
        ) : null}

        {leaveTab === "requests" ? (
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionHeader title="Leave Requests" subtitle="Approved leave updates attendance summaries for payroll." right={<Button variant="primary"><Plus size={16} /> Apply Leave</Button>} />
              <table className="table">
                <thead><tr><th>Employee</th><th>Type</th><th>Date Range</th><th>Days</th><th>Status</th></tr></thead>
                <tbody>
                  {leaveRequests.map((lr) => (
                    <tr key={lr.id} className="rowHover">
                      <td>{lr.employee}</td><td>{lr.type}</td><td>{lr.range}</td><td>{lr.days}</td><td><Badge>{lr.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SectionHeader title="Apply Leave (Fields Required)" right={<RequiredLegend />} />
                <div className="grid cols3">
                  <Field label="Employee" required><Input placeholder="Select employee" /></Field>
                  <Field label="Leave Type" required><Input placeholder="Select leave type" /></Field>
                  <Field label="Category" required>
                    <Select value={"FULL"} onChange={() => {}} placeholder="Select" options={[{ value: "FULL", label: "Full Day" }, { value: "HALF", label: "Half Day" }]} />
                  </Field>
                  <Field label="Start Date" required><Input type="date" /></Field>
                  <Field label="End Date" required><Input type="date" /></Field>
                  <Field label="Reason" required hint="Max 200"><Input placeholder="Reason" /></Field>
                </div>
              </CardContent></Card>
            </CardContent>
          </Card>
        ) : null}

        {leaveTab === "summary" ? (
          <Card><CardContent>
            <SectionHeader title="Leave Summaries" subtitle="Monthly/annual views; export-ready." />
            <div className="smallNote">Demo placeholder: annual leave summary & carry-forward controls.</div>
          </CardContent></Card>
        ) : null}
      </PageShell>
    );
  }

  function Overtime() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Overtime" subtitle="Store approved minutes categorized by day type (workday/weekend/holiday). Do not hardcode pay rates in Phase 1." right={<Button variant="primary"><Plus size={16} /> Request OT</Button>} />
            <table className="table">
              <thead><tr><th>Employee</th><th>Date</th><th>Day Type</th><th>Minutes</th><th>Status</th></tr></thead>
              <tbody>
                {overtimeRequests.map((ot) => (
                  <tr key={ot.id} className="rowHover">
                    <td>{ot.employee}</td><td>{ot.date}</td><td>{ot.dayType}</td><td>{ot.minutes}</td><td><Badge>{ot.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SectionHeader title="Request OT (Fields Required)" right={<RequiredLegend />} />
              <div className="grid cols3">
                <Field label="Employee" required><Input placeholder="Select employee" /></Field>
                <Field label="Date" required><Input type="date" /></Field>
                <Field label="Minutes" required><Input placeholder="e.g., 120" /></Field>
                <Field label="Reason" required><Input placeholder="Reason" /></Field>
                <Field label="Day Type" required hint="Computed from calendar; shown here for demo">
                  <Select value={"WORKING_DAY"} onChange={() => {}} placeholder="Select" options={[
                    { value: "WORKING_DAY", label: "Working Day" },
                    { value: "WEEKEND", label: "Weekend" },
                    { value: "PUBLIC_HOLIDAY", label: "Public Holiday" },
                  ]} />
                </Field>
              </div>
            </CardContent></Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Approvals() {
    const act = (id, status) => setApprovalsQueue(approvalsQueue.map((a) => (a.id === id ? { ...a, status } : a)));

    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Approvals Queue" subtitle="Single place to approve attendance, leave, OT, and change requests." />
            <table className="table">
              <thead><tr><th>Type</th><th>Reference</th><th>Employee</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {approvalsQueue.map((a) => (
                  <tr key={a.id} className="rowHover">
                    <td>{a.type}</td><td>{a.ref}</td><td>{a.who}</td>
                    <td><Badge tone={a.status === "APPROVED" ? "filled" : "outline"}>{a.status}</Badge></td>
                    <td style={{ textAlign: "right" }}>
                      <span style={{ display: "inline-flex", gap: 8 }}>
                        <Button variant="secondary" onClick={() => act(a.id, "REJECTED")}>Reject</Button>
                        <Button variant="primary" onClick={() => act(a.id, "APPROVED")}>Approve</Button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function Reports() {
    const tabs = [
      { key: "attendance", label: "Attendance" },
      { key: "leave", label: "Leave" },
      { key: "compliance", label: "Compliance" },
      { key: "payrollReady", label: "Payroll Ready Export" },
    ];

    return (
      <PageShell>
        <Tabs tabs={tabs} active={reportTab} onChange={setReportTab} />

        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader
              title={`Report: ${tabs.find((t) => t.key === reportTab)?.label}`}
              subtitle="Exports supported: CSV/XLSX/PDF (formats accepted by UAE operations)."
              right={<Button variant="secondary"><Download size={16} /> Export</Button>}
            />

            {reportTab === "payrollReady" ? (
              <Card className="sm">
                <CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontWeight: 800 }}>Payroll-Ready Export (Phase 2 Input)</div>
                  <div className="smallNote">Export per pay period: worked minutes, OT by category, unpaid leave, absences.</div>
                  <div className="grid cols4">
                    <Field label="Pay Period Start" required><Input type="date" /></Field>
                    <Field label="Pay Period End" required><Input type="date" /></Field>
                    <Field label="Organization" required><Input placeholder="Select" /></Field>
                    <Field label="Branch" hint="Optional"><Input placeholder="All" /></Field>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="smallNote">Demo placeholder: report filters + table results for {reportTab}.</div>
            )}
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function SecurityPage() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Security & PDPL Controls" subtitle="Role-based access, audit logs, MFA, and sensitive-field change workflow." />
            <div className="grid cols3">
              <Card className="sm"><CardContent>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Authentication</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li>Username/password</li><li>Email OTP (2FA)</li><li>Token/TOTP (optional)</li><li>Login attempt limits</li>
                </ul>
              </CardContent></Card>
              <Card className="sm"><CardContent>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>PII Protection</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li>Encrypt Emirates ID / Passport / Visa / IBAN</li><li>Mask in UI by role</li><li>Audit logs for access/changes</li>
                </ul>
              </CardContent></Card>
              <Card className="sm"><CardContent>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Change Requests</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li>Employees can submit updates</li><li>HR approves before apply</li><li>Immutable audit record</li>
                </ul>
              </CardContent></Card>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function SettingsPage() {
    return (
      <PageShell>
        <Card>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionHeader title="Settings" subtitle="Company settings + Phase 2 payroll readiness controls." right={<RequiredLegend />} />
            <div className="grid cols3">
              <Field label="Default Timezone" required><Input value="Asia/Dubai" readOnly /></Field>
              <Field label="Enable Attendance Lock" required>
                <Select value={"YES"} onChange={() => {}} placeholder="Select" options={[{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }]} />
              </Field>
              <Field label="Expiry Alert Threshold" required hint="Default 30/15/7"><Input placeholder="30,15,7" /></Field>
            </div>

            <Card className="sm"><CardContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontWeight: 800 }}>Phase 2 Payroll Architecture Locks (no refactor later)</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Use effective-dated salary component table (Basic + Allowances)</li>
                <li>Use effective-dated employment terms table</li>
                <li>Payroll consumes daily attendance summaries only</li>
                <li>Implement payroll lock per pay period to freeze edits</li>
              </ul>
            </CardContent></Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  
  function GratuityPage() {
    return (
      <PageShell>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <SectionHeader
              title="Gratuity (Phase 2 Ready)"
              subtitle="Stores required fields now; calculation and payouts happen in Phase 2 payroll/final settlement."
              right={<RequiredLegend />}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Gratuity First 5 Years (days/year)" required hint="Org setting (default 21)">
                <Input
                  type="number"
                  value={org.gratuityFirst5YearDays}
                  onChange={(e) => setOrg({ ...org, gratuityFirst5YearDays: Number(e.target.value) })}
                />
              </Field>
              <Field label="Gratuity After 5 Years (days/year)" required hint="Org setting (default 30)">
                <Input
                  type="number"
                  value={org.gratuityAfter5YearDays}
                  onChange={(e) => setOrg({ ...org, gratuityAfter5YearDays: Number(e.target.value) })}
                />
              </Field>
              <Field label="Gratuity Cap (years of basic salary)" required hint="Org setting (default 2)">
                <Input
                  type="number"
                  value={org.gratuityCapYears}
                  onChange={(e) => setOrg({ ...org, gratuityCapYears: Number(e.target.value) })}
                />
              </Field>
            </div>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold">Employee Fields Required for Gratuity</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Joining Date</li>
                  <li>Basic Salary (effective-dated in Phase 2)</li>
                  <li>Termination Date (final settlement)</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function SalaryPage() {
    return (
      <PageShell>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <SectionHeader
              title="Salary Components (Enterprise Data Model)"
              subtitle="Master components + effective-dated employee assignments (placeholders stored now)."
              right={
                <Button className="rounded-xl">
                  <Plus className="mr-2" size={16} /> New Component
                </Button>
              }
            />
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Calc</th>
                  <th>WPS Class</th>
                </tr>
              </thead>
              <tbody>
                {salaryComponents.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.type}</td>
                    <td>{c.calc}</td>
                    <td>{c.wpsClass}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold">Employee Salary Assignments (effective-dated)</h4>
                <p className="text-sm text-gray-600">
                  Phase 2 payroll will read these assignments per period. In Phase 1, we store them to avoid DB changes later.
                </p>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="py-2">Employee</th>
                      <th>Component</th>
                      <th>Amount</th>
                      <th>Effective From</th>
                      <th>Effective To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeSalaryAssignments.map((a, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2">{a.employeeId}</td>
                        <td>{a.componentId}</td>
                        <td>{a.amount}</td>
                        <td>{a.effectiveFrom}</td>
                        <td>{a.effectiveTo || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function PayrollPage() {
    return (
      <PageShell>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <SectionHeader
              title="Payroll Periods (Draft → Approved → Locked)"
              subtitle="Enterprise requirement: payroll consumes locked attendance summaries and produces stored results per period."
              right={
                <Button className="rounded-xl" onClick={() => {
                  const nextId = `PP-${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}`;
                  setPayrollPeriods([{ id: nextId, start: "", end: "", payMonth: new Date().getMonth()+1, payYear: new Date().getFullYear(), status: "DRAFT", lockedAt: null, lockedBy: null }, ...payrollPeriods]);
                }}>
                  <Plus className="mr-2" size={16} /> New Period
                </Button>
              }
            />

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Period ID</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Locked</th>
                </tr>
              </thead>
              <tbody>
                {payrollPeriods.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{p.id}</td>
                    <td>{p.start || "—"}</td>
                    <td>{p.end || "—"}</td>
                    <td><Badge variant="secondary">{p.status}</Badge></td>
                    <td>{p.lockedAt ? `${p.lockedAt} by ${p.lockedBy}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold">Payroll Results (stored per period)</h4>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="py-2">Period</th>
                      <th>Employee</th>
                      <th>Days Worked</th>
                      <th>Fixed</th>
                      <th>Variable</th>
                      <th>Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollResults.map((r, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2">{r.periodId}</td>
                        <td>{r.employeeId}</td>
                        <td>{r.daysWorked}</td>
                        <td>{r.fixedAmount}</td>
                        <td>{r.variableAmount}</td>
                        <td>{r.net}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function WPSPage() {
    const samplePeriod = payrollPeriods[0];
    const sampleEmp = employees[0];
    return (
      <PageShell>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <SectionHeader
              title="WPS Export (SIF Preview)"
              subtitle="Fields are stored now so Phase 2 can generate compliant WPS files without schema changes."
            />

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold">Required Fields Checklist</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Org: MOHRE Establishment Number</li>
                  <li>Org: WPS Bank Routing Code</li>
                  <li>Employee: IBAN</li>
                  <li>Employee: MOHRE Person ID / Labour Identifier</li>
                  <li>Payroll Result: Fixed + Variable earnings + days worked</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold">SIF Preview (Sample)</h4>
                <pre className="pre">
{`1,${org.mohreEstablishment || ""},${org.wpsBankRoutingCode || ""},${String(samplePeriod?.payMonth ?? 0).padStart(2,'0')},${samplePeriod?.payYear ?? ""},${employees.length},${(payrollResults || []).reduce((s,x)=>s+(x.net||0),0)},AED
2,${org.wpsBankRoutingCode || ""},${sampleEmp?.iban || ""},${sampleEmp?.name || ""},${sampleEmp?.mohrePersonId || ""},${sampleEmp?.code || ""},30,${(sampleEmp?.basicSalary || 0) + ((sampleEmp?.allowances?.housing||0)+(sampleEmp?.allowances?.transport||0)+(sampleEmp?.allowances?.other||0))},0`}
                </pre>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function LoansPage() {
    return (
      <PageShell>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <SectionHeader
              title="Loans (Payroll Deductions)"
              subtitle="Enterprise payroll requires automatic deduction schedules; store loan fields now."
              right={
                <Button className="rounded-xl">
                  <Plus className="mr-2" size={16} /> New Loan
                </Button>
              }
            />
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Loan ID</th>
                  <th>Employee</th>
                  <th>Total</th>
                  <th>Installment</th>
                  <th>Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeLoans.map((l) => (
                  <tr key={l.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{l.id}</td>
                    <td>{l.employeeId}</td>
                    <td>{l.totalAmount}</td>
                    <td>{l.installmentAmount}</td>
                    <td>{l.remainingBalance}</td>
                    <td><Badge variant="secondary">{l.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  function FinalSettlementPage() {
    return (
      <PageShell>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <SectionHeader
              title="Final Settlement (Phase 2)"
              subtitle="Stores termination settlement entity now: gratuity + leave encashment + notice + deductions."
            />
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Settlement</th>
                  <th>Employee</th>
                  <th>Status</th>
                  <th>Termination Date</th>
                  <th>Total Payable</th>
                </tr>
              </thead>
              <tbody>
                {finalSettlements.map((fs) => (
                  <tr key={fs.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{fs.id}</td>
                    <td>{fs.employeeId}</td>
                    <td><Badge variant="secondary">{fs.status}</Badge></td>
                    <td>{fs.terminationDate || "—"}</td>
                    <td>{fs.totalPayable}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold">Required Settlement Fields (stored now)</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Termination date, last working day</li>
                  <li>Gratuity amount</li>
                  <li>Leave encashment amount</li>
                  <li>Notice pay / deductions</li>
                  <li>Other earnings/deductions</li>
                  <li>Approval status + audit fields</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

function Content() {
    switch (page) {
      case "dashboard": return <Dashboard />;
      case "organization": return <Organization />;
      case "branches": return <Branches />;
      case "masters": return <Masters />;
      case "employees": return <Employees />;
      case "onboarding": return <Onboarding />;
      case "documents": return <Documents />;
      case "shifts": return <Shifts />;
      case "roster": return <Roster />;
      case "attendance": return <Attendance />;
      case "leave": return <Leave />;
      case "overtime": return <Overtime />;
      case "gratuity": return <GratuityPage />;
      case "salary": return <SalaryPage />;
      case "payroll": return <PayrollPage />;
      case "wps": return <WPSPage />;
      case "finalSettlement": return <FinalSettlementPage />;
      case "loans": return <LoansPage />;
      case "approvals": return <Approvals />;
      case "reports": return <Reports />;
      case "security": return <SecurityPage />;
      case "settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="brand">
          <h1>HRIS</h1>
          <span className="pill">Dubai/UAE</span>
        </div>

        <nav className="nav">
          {NAV.map((n) => <NavItem key={n.key} item={n} />)}
        </nav>

        <div style={{ marginTop: "auto" }} className="smallNote">
          Demo prototype • English-only • Navigation enabled • Required fields shown
        </div>
      </aside>

      <main className="main">
        <TopBar />
        <Content />
      </main>
    </div>
  );
}
