import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout    from './layouts/AppLayout'
import Home         from './pages/Home'
import SeekerPage   from './pages/SeekerPage'
import SeekerHome   from './pages/seeker/SeekerHome'
import SearchResults from './pages/seeker/SearchResults'
import BookingFlow  from './pages/seeker/BookingFlow'
import TeamHire           from './pages/seeker/TeamHire'
import TeamBookingConfirm from './pages/seeker/TeamBookingConfirm'

/* Worker flow */
import WorkerDashboard from './pages/worker/WorkerDashboard'
import WorkerSetup     from './pages/worker/WorkerSetup'
import WorkerProfile   from './pages/worker/WorkerProfile'
import WorkerPage      from './pages/WorkerPage'

/* Admin */
import AdminLayout     from './layouts/AdminLayout'
import AdminDashboard  from './pages/admin/AdminDashboard'
import WorkersTable    from './pages/admin/WorkersTable'
import JobsTable       from './pages/admin/JobsTable'
import BookingsTable   from './pages/admin/BookingsTable'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public / Seeker / Worker routes (use AppLayout) ── */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          {/* Seeker flow */}
          <Route path="/seeker"                element={<SeekerHome />}           />
          <Route path="/seeker/results"        element={<SearchResults />}        />
          <Route path="/seeker/book/:workerId" element={<BookingFlow />}          />
          <Route path="/seeker/team"           element={<TeamHire />}             />
          <Route path="/seeker/team/confirm"   element={<TeamBookingConfirm />}   />
          <Route path="/seeker/browse"         element={<SeekerPage />}           />

          {/* Worker flow */}
          <Route path="/worker"         element={<WorkerDashboard />} />
          <Route path="/worker/setup"   element={<WorkerSetup />}     />
          <Route path="/worker/profile" element={<WorkerProfile />}   />
          <Route path="/worker/jobs"    element={<WorkerPage />}      />
        </Route>

        {/* ── Admin routes (use AdminLayout with sidebar) ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index              element={<AdminDashboard />} />
          <Route path="workers"     element={<WorkersTable />}   />
          <Route path="jobs"        element={<JobsTable />}      />
          <Route path="bookings"    element={<BookingsTable />}  />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
