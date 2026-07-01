<template>
  <Header title="គ្រប់គ្រងព័ត៌មានមន្ត្រី" />

  <section class="appppw">
    <Aside />

    <div class="sw">
      <div class="app_content">
        <div class="ocm_dashboard_splits">
          <div class="ocm_bfw ocm_stat officer-stat-grid">
            <div class="ocm_caw noneh status_wait">
              <div class="ocm_card_body">
                <div class="ocm_icardw">
                  <h5 class="ocm_card_value">{{ newOfficers }}</h5>
                  <div class="ocm_icard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    </svg>
                  </div>
                </div>
                <p class="ocm_card_title">មន្ត្រីថ្មី</p>
              </div>
            </div>

            <div class="ocm_caw noneh status_all">
              <div class="ocm_card_body">
                <div class="ocm_icardw">
                  <h5 class="ocm_card_value">{{ allOfficers }}</h5>
                  <div class="ocm_icard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05C15.64 13.37 17 14.28 17 15.5V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                </div>
                <p class="ocm_card_title">មន្ត្រីទាំងអស់</p>
              </div>
            </div>

            <div class="ocm_caw noneh status_accept">
              <div class="ocm_card_body">
                <div class="ocm_icardw">
                  <h5 class="ocm_card_value">{{ headOfSection }}</h5>
                  <div class="ocm_icard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm0-4H7v-2h5v2zm0-4H7V7h5v2zm7 8h-5v-2h5v2zm0-4h-5v-2h5v2zm0-4h-5V7h5v2z"/>
                    </svg>
                  </div>
                </div>
                <p class="ocm_card_title">ប្រធានផ្នែក</p>
              </div>
            </div>

            <div class="ocm_caw noneh status_decline">
              <div class="ocm_card_body">
                <div class="ocm_icardw">
                  <h5 class="ocm_card_value">{{ departmentDirector }}</h5>
                  <div class="ocm_icard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    </svg>
                  </div>
                </div>
                <p class="ocm_card_title">នាយកដ្ឋាន</p>
              </div>
            </div>

            <div class="ocm_caw noneh status_info">
              <div class="ocm_card_body">
                <div class="ocm_icardw">
                  <h5 class="ocm_card_value">{{ officerCount }}</h5>
                  <div class="ocm_icard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    </svg>
                  </div>
                </div>
                <p class="ocm_card_title">មន្ត្រី</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ocm_cwr">
          <h2 class="h wttt ocm_ptitle t-lspace">គ្រប់គ្រងព័ត៌មានមន្ត្រី</h2>
          <button class="oc_nbtn t-lspace officer-add-btn" type="button" @click="openOfficerEditor()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 14 14">
              <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/>
            </svg>
            បន្ថែមមន្ត្រីថ្មី
          </button>
        </div>

        <div class="ocm_tb_wrap search_wrap">
          <div class="ocm_sort_search_bar">
            <input
              v-model="searchQuery"
              class="ocm_search_input"
              type="text"
              placeholder="ស្វែងរកមន្ត្រី..."
              @keyup.enter="searchOfficials"
            />
            <button class="ocm_search_btn" type="button" @click="searchOfficials">ស្វែងរក</button>
            <button v-if="searchQuery" class="ocm_reset_btn" type="button" @click="resetSearch">សម្អាត</button>
          </div>
        </div>

        <div class="ocm_dashboard_splits">
          <div class="ocm_card_wr officer-table-card">
            <div class="ocm_card_head">
              <span class="ocm_card_title">បញ្ជីមន្ត្រី</span>
            </div>

            <div class="ocm_card_content">
              <div class="ocm_tb_wrap officer-table-wrap">
                <table class="wp-list-table officer-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>រូប</th>
                      <th>ឈ្មោះ</th>
                      <th>កូដ</th>
                      <th>ស្រុកកំណើត</th>
                      <th>ថ្ងៃតាំងជាផ្លូវការ</th>
                      <th>អ៊ីមែល</th>
                      <th>លេខទូរស័ព្ទ</th>
                      <th>ភេទ</th>
                      <th>តួនាទី</th>
                      <th>អង្គភាព</th>
                      <th>ថ្នាក់</th>
                      <th>ប្រភេទមន្ត្រី</th>
                      <th>ថ្នាក់ប្រាក់ខែ</th>
                      <th>សកម្មភាព</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="loading">
                      <td colspan="15" class="ocm_dt_empt">កំពុងទាញយកទិន្នន័យ...</td>
                    </tr>

                    <tr v-else-if="errorMessage">
                      <td colspan="15" class="ocm_dt_empt">{{ errorMessage }}</td>
                    </tr>

                    <tr v-for="(official, idx) in pagedOfficials" :key="official.id">
                      <td>{{ formatKhmerNumber((currentPage - 1) * pageSize + idx + 1) }}</td>

                      <td>
                        <img
                          v-if="official.image"
                          :src="official.image"
                          :alt="official.full_name"
                          class="officer-avatar"
                        />
                        <div v-else class="avatar-fallback">
                          {{ official.full_name.charAt(0) || 'O' }}
                        </div>
                      </td>

                      <td>
                        <div class="name_primary">{{ official.full_name }}</div>
                        <div v-if="official.full_name_en && official.full_name_en !== '-'" class="name_secondary">
                          {{ official.full_name_en }}
                        </div>
                      </td>

                      <td>{{ official.code }}</td>
                      <td>{{ official.province }}</td>
                      <td>{{ official.official_date }}</td>
                      <td>{{ official.email }}</td>
                      <td>{{ official.phone }}</td>
                      <td>{{ official.gender }}</td>
                      <td>{{ official.current_position }}</td>
                      <td>{{ official.current_organization }}</td>
                      <td>{{ official.rank }}</td>
                      <td>{{ official.officer_type }}</td>
                      <td>{{ official.salary_rank }}</td>

                      <td>
                        <span class="tbl_action">
                          <span class="row_ac_w">
                            <button
                              class="row_ac_in ocm-tooltip ocm-viac view"
                              type="button"
                              title="មើលកាតមន្ត្រី"
                              @click="openOfficerCard(official)"
                            >
                              <span class="tip_txt">មើលកាត</span>
                              <span class="d-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="76.03 186 871.95 652" width="18" height="18">
                                  <path d="M396 512a112 112 0 1 0 224 0a112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176s176 78.8 176 176s-78.8 176-176 176z" fill="currentColor"></path>
                                </svg>
                              </span>
                            </button>

                            <button
                              class="row_ac_in ocm-tooltip ocm-edac edit"
                              type="button"
                              title="កែប្រែ"
                              @click="openOfficerEditor(official)"
                            >
                              <span class="tip_txt">កែប្រែ</span>
                              <span class="d-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 1.88 19.12 19.12" width="18" height="18">
                                  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"></path>
                                    <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3L9 12v3"></path>
                                    <path d="M16 5l3 3"></path>
                                  </g>
                                </svg>
                              </span>
                            </button>

                            <button
                              class="row_ac_in ocm-tooltip ocm-rmac delete"
                              type="button"
                              title="លុប"
                              @click="deleteOfficial(official.id)"
                            >
                              <span class="tip_txt">លុប</span>
                              <span class="d-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18">
                                  <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" fill="currentColor"></path>
                                </svg>
                              </span>
                            </button>
                          </span>
                        </span>
                      </td>
                    </tr>

                    <tr v-if="!loading && !errorMessage && pagedOfficials.length === 0">
                      <td colspan="15" class="ocm_dt_empt">មិនមានទិន្នន័យ</td>
                    </tr>
                  </tbody>
                </table>

                <div v-if="totalPages > 1" class="pagination_w logs_pagination_bar">
                  <div class="pagination">
                    <button class="nav_i prev" type="button" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.05 37.65 448.05 436.7"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" fill="currentColor"></path></svg>
                      ពីមុន
                    </button>

                    <button
                      v-for="page in visiblePages"
                      :key="page"
                      class="nav_i page"
                      :class="{ current: currentPage === page }"
                      type="button"
                      @click="goToPage(page)"
                    >
                      {{ formatKhmerNumber(page) }}
                    </button>

                    <button class="nav_i next" type="button" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
                      បន្ទាប់
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 37.65 448.05 436.7"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path></svg>
                    </button>
                  </div>

                  <span class="ocm_count t-lspace">
                    ចំនួនមន្ត្រី៖ {{ formatKhmerNumber(allOfficers) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <div
        v-if="showOfficerCard && selectedOfficer"
        class="modal fixed inset-0 z-50 flex items-center justify-center"
        style="background: rgba(0, 0, 0, 0.2);"
      >
        <div class="officer-card-modal" :class="{ 'officer-card-modal--horizontal': cardOrientation === 'horizontal', 'officer-card-modal--vertical': cardOrientation === 'vertical' }">
          <div class="officer-card-toolbar">
            <div class="card-orientation-toggle">
              <button
                type="button"
                class="card-orientation-toggle__btn"
                :class="{ 'card-orientation-toggle__btn--active': cardOrientation === 'vertical' }"
                title="Vertical card"
                aria-label="Switch to vertical card"
                @click="cardOrientation = 'vertical'"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="7" y="3.5" width="10" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <line x1="9.5" y1="7" x2="14.5" y2="7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  <line x1="9.5" y1="10.5" x2="14.5" y2="10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  <line x1="9.5" y1="14" x2="12.5" y2="14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                </svg>
              </button>
              <button
                type="button"
                class="card-orientation-toggle__btn"
                :class="{ 'card-orientation-toggle__btn--active': cardOrientation === 'horizontal' }"
                title="Horizontal card"
                aria-label="Switch to horizontal card"
                @click="cardOrientation = 'horizontal'"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="7" width="17" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <line x1="7" y1="9.5" x2="17" y2="9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  <line x1="7" y1="12.5" x2="15" y2="12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  <line x1="7" y1="15.5" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                </svg>
              </button>
            </div>

            <div class="officer-card-actions">
              <button type="button" @click="printOfficerCard" class="modal-action-btn print" title="Print">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6 19v2h12v-2H6zm12-8V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v6H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3zm-10-6h8v6H8V5zm13 14H3v-7h18v7zm-2-2v-2h-2v2h2zm-4 0v-2h-2v2h2zm-4 0v-2H7v2h2z"/>
                </svg>
              </button>

              <button type="button" @click="downloadOfficerCard" class="modal-action-btn download" title="Download PDF">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 16.5l4-4h-3V7h-2v5.5H8l4 4zm-6 2.5h12v2H6v-2z"/>
                </svg>
              </button>

              <button type="button" @click="closeOfficerCard" class="modal-action-btn close" title="Cancel">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11l4.89 4.89-4.89 4.89a1 1 0 1 0 1.41 1.41l4.89-4.89 4.89 4.89a1 1 0 0 0 1.41-1.41l-4.89-4.89 4.89-4.89a1 1 0 0 0 0-1.41z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="officer-card-page" :class="{ 'officer-card-page--vertical': cardOrientation === 'vertical', 'officer-card-page--horizontal': cardOrientation === 'horizontal' }" id="officerCardToPrint">
            <div
              v-if="cardOrientation === 'vertical'"
              class="card officer-vertical-card"
              :style="{ backgroundImage: `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url('${ocmLogoUrl}')` }"
            >
              <div class="officer-vertical-card__content">
                <div class="officer-card-brand">
                  <div class="officer-card-brand__logo">
                    <img :src="ocmLogoUrl" alt="Office of the Council of Ministers" class="officer-card-brand__logo-image" />
                  </div>
                  <div class="officer-card-brand__title font-moul">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                  <div class="officer-card-brand__subtitle">Office of the Council of Ministers</div>
                </div>

                <div class="officer-card-photo-wrap">
                  <img :src="selectedOfficer.image || officerCardFallbackImage(selectedOfficer)" class="card-photo" />
                </div>

                <div class="officer-card-code">{{ selectedOfficer.code }}</div>

                <table class="officer-card-meta officer-card-meta--vertical">
                  <tbody>
                    <tr>
                      <td>ឈ្មោះ</td>
                      <td>{{ selectedOfficer.full_name }}</td>
                    </tr>
                    <tr>
                      <td>តួនាទី</td>
                      <td>{{ selectedOfficer.current_position }}</td>
                    </tr>
                    <tr>
                      <td>អង្គភាព</td>
                      <td>{{ selectedOfficer.current_organization }}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="officer-card-seal-row officer-card-seal-row--vertical">
                  <div class="officer-card-qr-wrap officer-card-qr-wrap--vertical">
                    <QrcodeVue
                      :value="getOfficerCardQrValue(selectedOfficer)"
                      :size="144"
                      :margin="2"
                      level="L"
                      class="officer-card-qr"
                      render-as="canvas"
                    />
                  </div>
                  <div class="officer-card-stamp-wrap officer-card-stamp-wrap--vertical">
                    <img src="/stamp.png" alt="Official stamp" class="officer-card-stamp officer-card-stamp--vertical" />
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="horizontal-officer-card">
              <div class="horizontal-officer-card__surface">
                <table class="horizontal-officer-card__table">
                  <tbody>
                    <tr>
                      <td class="horizontal-officer-card__photo-cell">
                        <div class="horizontal-officer-card__photo-box">
                          <img :src="selectedOfficer.image || officerCardFallbackImage(selectedOfficer)" alt="Officer Photo" class="horizontal-officer-card__photo" />
                          <div>លេខ <strong>{{ selectedOfficer.code || `OCM-ORG-${selectedOfficer.id}` }}</strong></div>
                        </div>
                      </td>

                      <td colspan="2" class="horizontal-officer-card__info-cell">
                        <div class="horizontal-officer-card__brand">
                          <div class="horizontal-officer-card__brand-logo">
                            <img :src="ocmLogoUrl" alt="Office of the Council of Ministers" class="horizontal-officer-card__brand-logo-image" />
                          </div>
                          <div>
                            <div class="horizontal-officer-card__brand-title font-moul">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                            <div class="horizontal-officer-card__brand-subtitle">Office of the Council of Ministers</div>
                          </div>
                        </div>

                        <table class="horizontal-officer-card__inner-table">
                          <tbody>
                            <tr>
                              <td class="horizontal-officer-card__small-text">គោត្តនាម-នាម :</td>
                              <td colspan="2">
                                <div class="horizontal-officer-card__bold">{{ getOfficerCardKhmerName(selectedOfficer) }}</div>
                                <div>{{ getOfficerCardEnglishName(selectedOfficer) }}</div>
                              </td>
                            </tr>

                            <tr>
                              <td class="horizontal-officer-card__small-text">ថ្ងៃខែឆ្នាំកំណើត :</td>
                              <td class="horizontal-officer-card__small-text">{{ getOfficerCardDob(selectedOfficer) }}</td>
                              <td class="horizontal-officer-card__small-text">ភេទ ៖ {{ selectedOfficer.gender }}</td>
                            </tr>

                            <tr>
                              <td class="horizontal-officer-card__small-text">អាសយដ្ឋាន :</td>
                              <td colspan="2" class="horizontal-officer-card__small-text">{{ getOfficerCardAddress(selectedOfficer) }}</td>
                            </tr>

                            <tr>
                              <td class="horizontal-officer-card__small-text">អង្គភាព :</td>
                              <td colspan="2" class="horizontal-officer-card__small-text">{{ getOfficerCardOrganization(selectedOfficer) }}</td>
                            </tr>

                            <tr>
                              <td class="horizontal-officer-card__small-text">មុខងារ :</td>
                              <td colspan="2" class="horizontal-officer-card__small-text">{{ getOfficerCardPosition(selectedOfficer) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td class="horizontal-officer-card__expire-cell">
                        <div class="horizontal-officer-card__expire-text">
                          បណ្ណសម្គាល់ខ្លួននេះផុតកំណត់នៅ<br>
                          ថ្ងៃទី០១ ខែកញ្ញា ឆ្នាំ២០២៦
                        </div>
                      </td>

                      <td class="horizontal-officer-card__qr-cell">
                        <div class="officer-card-qr-wrap officer-card-qr-wrap--horizontal">
                          <QrcodeVue :value="getOfficerCardQrValue(selectedOfficer)" :size="108" :margin="2" level="L" class="officer-card-qr officer-card-qr--horizontal" render-as="canvas" />
                        </div>
                      </td>

                      <td class="horizontal-officer-card__spacer-cell">
                        <div class="officer-card-stamp-wrap officer-card-stamp-wrap--horizontal">
                          <img src="/stamp.png" alt="Official stamp" class="officer-card-stamp officer-card-stamp--horizontal" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import QrcodeVue from 'qrcode.vue'
import ocmLogoUrl from '@/assets/logo_main.svg?url'
import khmerMoulWoff2Url from '@/assets/fonts/KhmerMoul.woff2?url'
import khmerMoulWoffUrl from '@/assets/fonts/KhmerMoul.woff?url'
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { authLogout, getAuthorization, getToken } from '@/plugins/authentication'
import { formatKhmerNumber } from '@/lib/utils.js'

const router = useRouter()

const apiBaseUrl = (import.meta.env.VITE_API_SERVER || import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

const officials = ref([])
const activeOfficerEndpoint = ref('')
const cardOrientation = ref('vertical')
const currentPage = ref(1)
const pageSize = ref(20)
const searchQuery = ref('')
const showOfficerCard = ref(false)
const selectedOfficer = ref(null)
const loading = ref(false)
const errorMessage = ref('')
const pagination = ref({
  totalRecords: 0,
  totalPages: 1,
  page: 1
})

const OFFICER_CARD_FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;500;700&display=swap');

  @font-face {
    font-family: 'KhmerMuol';
    src: url('${khmerMoulWoff2Url}') format('woff2'),
         url('${khmerMoulWoffUrl}') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Noto Sans Khmer', 'Khmer UI', 'Leelawadee UI', sans-serif;
  }
`

const officerEndpoints = () => {
  const endpoints = [
    `${apiBaseUrl}/officers`,
    `${apiBaseUrl}/api/authcenter/officers`
  ]

  return [...new Set(endpoints)]
}

const allOfficers = computed(() => pagination.value.totalRecords || 0)

const newOfficers = computed(() => {
  const now = new Date()
  return officials.value.filter((officer) => {
    if (!officer.official_date || officer.official_date === '-') return false
    const date = new Date(officer.official_date)
    if (Number.isNaN(date.getTime())) return false
    const diffDays = (now - date) / (1000 * 60 * 60 * 24)
    return diffDays >= 0 && diffDays <= 30
  }).length
})

const countByPosition = (matcher) => {
  return officials.value.filter((officer) => matcher((officer.current_position || '').trim())).length
}

const headOfSection = computed(() => countByPosition((position) => position.includes('ប្រធានផ្នែក')))
const departmentDirector = computed(() => countByPosition((position) => position.includes('នាយក')))
const officerCount = computed(() => countByPosition((position) => position === 'មន្ត្រី' || position.includes('Officer')))
const pagedOfficials = computed(() => officials.value)
const totalPages = computed(() => pagination.value.totalPages || 1)

const visiblePages = computed(() => {
  if (totalPages.value <= 1) return []

  const maxVisible = 10
  const half = Math.floor(maxVisible / 2)
  let startPage = Math.max(1, currentPage.value - half)
  let endPage = Math.min(totalPages.value, startPage + maxVisible - 1)

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
})

const getHeaders = () => {
  const headers = {
    Accept: 'application/json'
  }

  const authorization = getAuthorization()
  if (authorization) {
    headers.Authorization = authorization
  }

  return headers
}

const ensureAuthenticated = () => {
  const token = getToken()
  if (token?.access_token) {
    return true
  }

  officials.value = []
  errorMessage.value = 'សូមចូលប្រព័ន្ធជាមុនសិន។'
  authLogout()
  router.push('/login')
  return false
}

const normalizeStorageAssetOrigin = (absoluteUrl) => {
  try {
    const parsed = new URL(absoluteUrl)
    const api = new URL(apiBaseUrl)
    const isLocalHost = (hostname) => hostname === 'localhost' || hostname === '127.0.0.1'

    if (
      isLocalHost(parsed.hostname) &&
      isLocalHost(api.hostname) &&
      parsed.port === api.port &&
      parsed.origin !== api.origin
    ) {
      parsed.protocol = api.protocol
      parsed.hostname = api.hostname
      return parsed.toString()
    }
  } catch (error) {
    return absoluteUrl
  }

  return absoluteUrl
}

const toSameOriginAssetUrl = (absoluteUrl) => {
  if (!absoluteUrl || typeof window === 'undefined') {
    return absoluteUrl
  }

  try {
    const parsed = new URL(absoluteUrl, window.location.origin)
    const isStoragePath = parsed.pathname.startsWith('/storage/') || parsed.pathname.startsWith('/uploads/')

    if (!isStoragePath) {
      return absoluteUrl
    }

    return `${window.location.origin}${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch (error) {
    return absoluteUrl
  }
}

const resolveImageUrl = (value) => {
  const source = typeof value === 'string' ? value.trim() : ''

  if (!source) {
    return ''
  }

  if (source.startsWith('data:') || source.startsWith('blob:')) {
    return source
  }

  if (source.startsWith('http://') || source.startsWith('https://')) {
    return toSameOriginAssetUrl(normalizeStorageAssetOrigin(source))
  }

  const normalizedPath = source.startsWith('/') ? source : `/${source}`

  if (normalizedPath.startsWith('/storage/') || normalizedPath.startsWith('/uploads/')) {
    return typeof window !== 'undefined'
      ? `${window.location.origin}${normalizedPath}`
      : `${apiBaseUrl}${normalizedPath}`
  }

  return `${apiBaseUrl}${normalizedPath}`
}

const formatGender = (gender) => {
  if (gender === 1 || gender === '1' || gender === 'male' || gender === 'Male') return 'ប្រុស'
  if (gender === 2 || gender === '2' || gender === 'female' || gender === 'Female') return 'ស្រី'
  return gender || '-'
}

const normalizeDisplayText = (value, fallback = '-') => {
  if (value === null || value === undefined) {
    return fallback
  }

  const normalized = `${value}`
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()

  return normalized || fallback
}

const getCurrentPosition = (officer) => {
  return (
    officer?.current_job?.organization_structure_position?.position?.name ||
    officer?.current_job?.organizationStructurePosition?.position?.name ||
    officer?.jobs?.[0]?.organization_structure_position?.position?.name ||
    officer?.jobs?.[0]?.organizationStructurePosition?.position?.name ||
    officer?.position?.name ||
    officer?.job_title ||
    '-'
  )
}

const getCurrentOrganization = (officer) => {
  return (
    officer?.current_job?.organization_structure_position?.organization_structure?.organization?.name ||
    officer?.current_job?.organizationStructurePosition?.organizationStructure?.organization?.name ||
    officer?.jobs?.[0]?.organization_structure_position?.organization_structure?.organization?.name ||
    officer?.jobs?.[0]?.organizationStructurePosition?.organizationStructure?.organization?.name ||
    officer?.organization?.name ||
    '-'
  )
}

const getBirthProvince = (people) => {
  return (
    people?.pobProvince?.name_kh ||
    people?.pobProvince?.name_en ||
    people?.pobDistrict?.name_kh ||
    people?.pob ||
    people?.address ||
    '-'
  )
}

const getOfficerImage = (officer, people) => {
  return resolveImageUrl(
    officer?.image ||
    officer?.image_url ||
    officer?.photo ||
    officer?.photo_url ||
    officer?.avatar_url ||
    officer?.user?.avatar_url ||
    officer?.user?.image ||
    people?.image ||
    people?.image_url ||
    people?.photo ||
    people?.photo_url ||
    ''
  )
}

const officerCardFallbackImage = (officer) => {
  return officer?.gender === 'ស្រី' ? '/female.jpeg' : '/male.jpeg'
}

const normalizeOfficer = (officer) => {
  const people = officer?.people || {}
  const khName = normalizeDisplayText([people.lastname, people.firstname].filter(Boolean).join(' '), '')
  const enName = normalizeDisplayText([people.enlastname, people.enfirstname].filter(Boolean).join(' '), '')
  const fallbackName = normalizeDisplayText([officer?.user?.lastname, officer?.user?.firstname].filter(Boolean).join(' '), '')
  const fullName = khName || enName || fallbackName || officer?.name || '-'

  return {
    id: officer.id,
    public_key: officer.public_key || '',
    code: officer.code || `OCM-${officer.id}`,
    full_name: normalizeDisplayText(fullName),
    full_name_en: normalizeDisplayText(enName || '-', '-'),
    province: normalizeDisplayText(getBirthProvince(people)),
    official_date: normalizeDisplayText(officer.official_date || '-'),
    unofficial_date: normalizeDisplayText(officer.unofficial_date || '-'),
    email: normalizeDisplayText(officer.email || people.email || officer?.user?.email || '-'),
    phone: normalizeDisplayText(officer.phone || people.mobile_phone || people.office_phone || officer?.user?.phone || '-'),
    gender: normalizeDisplayText(formatGender(people.gender || officer.gender)),
    current_position: normalizeDisplayText(getCurrentPosition(officer)),
    current_organization: normalizeDisplayText(getCurrentOrganization(officer)),
    rank: normalizeDisplayText(officer?.rank?.name || officer?.rank?.rank || '-'),
    officer_type: normalizeDisplayText(officer.officer_type || '-'),
    additional_officer_type: normalizeDisplayText(officer.additional_officer_type || '-'),
    salary_rank: normalizeDisplayText(officer.salary_rank || '-'),
    leader: Boolean(officer.leader),
    image: getOfficerImage(officer, people),
    raw: officer
  }
}

const unwrapOfficerPayload = (payload) => {
  if (payload?.ok === false) {
    throw new Error(payload.message || 'មិនអាចទាញយកទិន្នន័យមន្ត្រីបានទេ។')
  }

  if (Array.isArray(payload?.records)) {
    return payload
  }

  if (Array.isArray(payload?.data?.records)) {
    return payload.data
  }

  if (Array.isArray(payload)) {
    return {
      records: payload,
      pagination: {
        totalRecords: payload.length,
        totalPages: 1,
        page: 1
      }
    }
  }

  return {
    records: [],
    pagination: {
      totalRecords: 0,
      totalPages: 1,
      page: 1
    }
  }
}

const fetchOfficers = async (page = 1) => {
  if (!ensureAuthenticated()) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  let lastError = null

  try {
    for (const endpoint of officerEndpoints()) {
      try {
        const response = await axios.get(endpoint, {
          params: {
            page,
            perPage: pageSize.value,
            search: searchQuery.value.trim() || undefined
          },
          headers: getHeaders()
        })

        const payload = unwrapOfficerPayload(response.data)
        const records = Array.isArray(payload.records) ? payload.records : []
        officials.value = records.map((record) => normalizeOfficer(record))
        pagination.value = payload.pagination || {
          totalRecords: records.length,
          totalPages: 1,
          page
        }
        currentPage.value = pagination.value.page || page
        activeOfficerEndpoint.value = endpoint
        return
      } catch (error) {
        lastError = error
      }
    }

    throw lastError || new Error('មិនអាចទាញយកទិន្នន័យមន្ត្រីបានទេ។')
  } catch (error) {
    officials.value = []
    errorMessage.value = error?.response?.data?.message || error.message || 'មានបញ្ហាក្នុងការទាញទិន្នន័យ។'
  } finally {
    loading.value = false
  }
}

const searchOfficials = () => {
  currentPage.value = 1
  fetchOfficers(1)
}

const resetSearch = () => {
  searchQuery.value = ''
  fetchOfficers(1)
}

const cacheOfficerForEdit = (officer) => {
  const officerId = officer?.id
  if (!officerId) return

  try {
    window.sessionStorage.setItem(`officer-edit:${officerId}`, JSON.stringify(officer?.raw || officer))
  } catch (error) {
    console.warn('Unable to cache officer record for edit page', { officerId, error })
  }
}

const openOfficerEditor = (officer = null) => {
  const hasEditRoute = router.getRoutes().some((route) => route.path === '/pdf/officer-edit')

  if (officer) {
    cacheOfficerForEdit(officer)
  }

  if (hasEditRoute) {
    const query = officer?.id ? { id: String(officer.id) } : undefined
    router.push({ path: '/pdf/officer-edit', query })
    return
  }

  window.alert('ទំព័រកែប្រែមន្ត្រីមិនទាន់មាននៅក្នុងគម្រោងនេះទេ។')
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  fetchOfficers(page)
}

const deleteOfficial = async (id) => {
  if (!window.confirm('តើអ្នកពិតជាចង់លុបមន្ត្រីនេះមែនទេ?')) return

  if (!ensureAuthenticated()) {
    return
  }

  const endpoints = activeOfficerEndpoint.value ? [activeOfficerEndpoint.value] : officerEndpoints()
  const deleteUrls = endpoints.flatMap((endpoint) => [`${endpoint}/${id}/delete`, `${endpoint}/${id}`])

  let lastError = null

  for (const url of deleteUrls) {
    try {
      const response = await axios.delete(url, {
        headers: getHeaders()
      })

      if (response.data?.ok === false) {
        throw new Error(response.data.message || 'លុបទិន្នន័យមន្ត្រីមិនបានទេ។')
      }

      await fetchOfficers(currentPage.value)
      return
    } catch (error) {
      lastError = error
    }
  }

  window.alert(lastError?.response?.data?.message || lastError?.message || 'មានបញ្ហាក្នុងការលុបមន្ត្រី។')
}

const openOfficerCard = (officer) => {
  selectedOfficer.value = {
    ...officer,
    image: resolveImageUrl(
      officer?.image ||
      officer?.image_url ||
      officer?.photo ||
      officer?.photo_url ||
      officer?.avatar_url ||
      ''
    )
  }
  cardOrientation.value = 'vertical'
  showOfficerCard.value = true
}

const closeOfficerCard = () => {
  showOfficerCard.value = false
  cardOrientation.value = 'vertical'
  selectedOfficer.value = null
}

const getOfficerPublicIdentifier = (officer) => {
  const identifier = officer?.public_key || officer?.id
  return identifier ? String(identifier).trim() : ''
}

const getOfficerPublicReadEndpoint = (officer) => {
  const identifier = getOfficerPublicIdentifier(officer)
  if (!identifier) {
    return ''
  }

  const authcenterBaseUrl = /\/api\/authcenter$/i.test(apiBaseUrl)
    ? apiBaseUrl
    : `${apiBaseUrl}/api/authcenter`

  return `${authcenterBaseUrl}/officers/${encodeURIComponent(identifier)}/read`
}

const getOfficerCardPublicUrl = (officer) => {
  const identifier = getOfficerPublicIdentifier(officer)
  const endpoint = getOfficerPublicReadEndpoint(officer)

  if (!identifier || !endpoint || typeof window === 'undefined') {
    return ''
  }

  const publicUrl = new URL('/officer-card.html', window.location.origin)
  publicUrl.searchParams.set('key', identifier)
  publicUrl.searchParams.set('endpoint', endpoint)
  return publicUrl.toString()
}

const getOfficerCardQrValue = (officer) => {
  if (!officer) {
    return ''
  }

  const publicUrl = getOfficerCardPublicUrl(officer)
  if (publicUrl) {
    return publicUrl
  }

  const briefInfo = [
    ['Officer Card', 'Office of the Council of Ministers'],
    ['Officer ID', officer.code || String(officer.id || '')],
    ['Khmer Name', getOfficerCardKhmerName(officer)],
    ['English Name', getOfficerCardEnglishName(officer)],
    ['Gender', officer.gender],
    ['Date of Birth', getOfficerCardDob(officer)],
    ['Phone', officer.phone],
    ['Email', officer.email],
    ['Address', getOfficerCardAddress(officer)],
    ['Position', getOfficerCardPosition(officer)],
    ['Organization', getOfficerCardOrganization(officer)],
    ['Rank', officer.rank],
    ['Officer Type', officer.officer_type],
    ['Official Date', officer.official_date],
    ['Public Key', officer.public_key]
  ]
    .filter(([, value]) => value && value !== '-')
    .map(([label, value]) => `${label}: ${normalizeDisplayText(value)}`)

  return briefInfo.join('\n')
}

const getOfficerCardKhmerName = (officer) => {
  const people = officer?.raw?.people || {}
  return normalizeDisplayText([people.lastname, people.firstname].filter(Boolean).join(' '), officer?.full_name || '-')
}

const getOfficerCardEnglishName = (officer) => {
  const people = officer?.raw?.people || {}
  return normalizeDisplayText([people.enlastname, people.enfirstname].filter(Boolean).join(' '), officer?.full_name_en || '-')
}

const getOfficerCardDob = (officer) => {
  return normalizeDisplayText(officer?.raw?.people?.dob || '-')
}

const getOfficerCardAddress = (officer) => {
  return normalizeDisplayText(officer?.raw?.people?.address || officer?.province || '-')
}

const getOfficerCardOrganization = (officer) => {
  return normalizeDisplayText(
    officer?.raw?.jobs?.[0]?.organizationStructurePosition?.organizationStructure?.organization?.name ||
    officer?.raw?.jobs?.[0]?.organization_structure_position?.organization_structure?.organization?.name ||
    officer?.raw?.organization?.name ||
    officer?.current_organization ||
    '-'
  )
}

const getOfficerCardPosition = (officer) => {
  return normalizeDisplayText(
    officer?.raw?.jobs?.[0]?.organizationStructurePosition?.position?.name ||
    officer?.raw?.jobs?.[0]?.organization_structure_position?.position?.name ||
    officer?.raw?.position?.name ||
    officer?.current_position ||
    '-'
  )
}

const getOfficerCardElement = () => {
  return document.getElementById('officerCardToPrint')
}

const sanitizeOfficerCardFileName = (value) => (
  `${value || ''}`
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
)

const getOfficerCardFileName = () => {
  const officer = selectedOfficer.value
  const englishName = getOfficerCardEnglishName(officer)
  const fallbackName = officer?.code || `officer-card-${officer?.id || 'export'}`
  const preferredName = englishName && englishName !== '-' ? englishName : fallbackName
  const sanitized = sanitizeOfficerCardFileName(preferredName)

  return sanitized || sanitizeOfficerCardFileName(fallbackName) || 'officer-card'
}

const copyComputedStyles = (sourceElement, targetElement) => {
  const computedStyle = window.getComputedStyle(sourceElement)

  Array.from(computedStyle).forEach((propertyName) => {
    const propertyValue = computedStyle.getPropertyValue(propertyName)
    const propertyPriority = computedStyle.getPropertyPriority(propertyName)
    targetElement.style.setProperty(propertyName, propertyValue, propertyPriority)
  })

  if (sourceElement instanceof SVGElement) {
    targetElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }

  if (sourceElement instanceof HTMLCanvasElement && targetElement instanceof HTMLCanvasElement) {
    targetElement.width = sourceElement.width
    targetElement.height = sourceElement.height

    const context = targetElement.getContext('2d')
    if (context) {
      context.drawImage(sourceElement, 0, 0)
    }
  }
}

const syncCanvasElements = (sourceRoot, targetRoot) => {
  const sourceCanvases = sourceRoot.querySelectorAll('canvas')
  const targetCanvases = targetRoot.querySelectorAll('canvas')

  sourceCanvases.forEach((sourceCanvas, index) => {
    const targetCanvas = targetCanvases[index]
    if (!(sourceCanvas instanceof HTMLCanvasElement) || !(targetCanvas instanceof HTMLCanvasElement)) {
      return
    }

    targetCanvas.width = sourceCanvas.width
    targetCanvas.height = sourceCanvas.height

    const context = targetCanvas.getContext('2d')
    if (context) {
      context.drawImage(sourceCanvas, 0, 0)
    }
  })
}

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
  reader.onerror = () => reject(reader.error || new Error('Failed to read image blob'))
  reader.readAsDataURL(blob)
})

const resolveAbsoluteAssetUrl = (src) => {
  const source = typeof src === 'string' ? src.trim() : ''

  if (!source) {
    return ''
  }

  if (source.startsWith('data:') || source.startsWith('blob:')) {
    return source
  }

  if (source.startsWith('http://') || source.startsWith('https://')) {
    return toSameOriginAssetUrl(normalizeStorageAssetOrigin(source))
  }

  if (source.startsWith('/storage/') || source.startsWith('/uploads/')) {
    return toSameOriginAssetUrl(`${apiBaseUrl}${source}`)
  }

  if (source.startsWith('/')) {
    return `${window.location.origin}${source}`
  }

  return toSameOriginAssetUrl(`${apiBaseUrl}/${source}`)
}

const shouldUseAuthenticatedImageFetch = (absoluteUrl) => {
  try {
    const parsed = new URL(normalizeStorageAssetOrigin(absoluteUrl))
    const apiOrigin = new URL(apiBaseUrl).origin
    return parsed.origin === apiOrigin || absoluteUrl.includes('/storage/')
  } catch (error) {
    return absoluteUrl.includes('/storage/')
  }
}

const loadImageAsDataUrl = async (src) => {
  const absoluteUrl = resolveAbsoluteAssetUrl(src)

  if (!absoluteUrl) {
    return ''
  }

  if (absoluteUrl.startsWith('data:')) {
    return absoluteUrl
  }

  const isSameOriginRequest = (() => {
    try {
      return new URL(absoluteUrl).origin === window.location.origin
    } catch (error) {
      return false
    }
  })()

  if (isSameOriginRequest) {
    try {
      const response = await fetch(absoluteUrl, { credentials: 'include' })
      if (response.ok) {
        return await blobToDataUrl(await response.blob())
      }
    } catch (error) {
      console.warn('Same-origin officer card image fetch failed', absoluteUrl, error)
    }
  }

  if (shouldUseAuthenticatedImageFetch(absoluteUrl)) {
    try {
      const response = await axios.get(absoluteUrl, {
        responseType: 'blob',
        headers: getHeaders()
      })
      return await blobToDataUrl(response.data)
    } catch (error) {
      console.warn('Authenticated officer card image fetch failed', absoluteUrl, error)
    }
  }

  return ''
}

const embedImageElement = async (image) => {
  if (!(image instanceof HTMLImageElement)) {
    return
  }

  const source = image.currentSrc || image.getAttribute('src') || image.src

  if (!source || source.startsWith('data:')) {
    return
  }

  const dataUrl = await loadImageAsDataUrl(source)
  if (!dataUrl) {
    return
  }

  image.src = dataUrl
  image.removeAttribute('srcset')
}

const embedSnapshotImages = async (root) => {
  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(images.map((image) => embedImageElement(image)))
}

let cachedOcmLogoRasterDataUrl = ''

const rasterizeImageSourceToPngDataUrl = (src, width = 0, height = 0) => new Promise((resolve) => {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.onload = () => {
    const targetWidth = width > 0 ? width : (image.naturalWidth || 96)
    const targetHeight = height > 0 ? height : (image.naturalHeight || 96)
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(targetWidth))
    canvas.height = Math.max(1, Math.round(targetHeight))
    const context = canvas.getContext('2d')

    if (!context) {
      resolve('')
      return
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    resolve(canvas.toDataURL('image/png'))
  }
  image.onerror = () => resolve('')
  image.src = src
})

const loadOcmLogoRasterDataUrl = async () => {
  if (cachedOcmLogoRasterDataUrl) {
    return cachedOcmLogoRasterDataUrl
  }

  const embedded = await loadImageAsDataUrl(ocmLogoUrl)
  const source = embedded || resolveAbsoluteAssetUrl(ocmLogoUrl)

  if (!source) {
    return ''
  }

  const raster = await rasterizeImageSourceToPngDataUrl(source)
  if (raster) {
    cachedOcmLogoRasterDataUrl = raster
  }

  return raster
}

const ensureOfficerCardBrandLogos = async (root) => {
  if (!root) {
    return
  }

  const logoDataUrl = await loadOcmLogoRasterDataUrl()
  if (!logoDataUrl) {
    return
  }

  root.querySelectorAll('.officer-card-brand__logo-image, .horizontal-officer-card__brand-logo-image').forEach((image) => {
    if (!(image instanceof HTMLImageElement)) {
      return
    }

    image.src = logoDataUrl
    image.removeAttribute('srcset')
  })

  const verticalCard = root.querySelector('.officer-vertical-card')
  if (verticalCard instanceof HTMLElement) {
    verticalCard.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url("${logoDataUrl}")`
    verticalCard.style.backgroundPosition = 'center'
    verticalCard.style.backgroundRepeat = 'no-repeat'
    verticalCard.style.backgroundSize = '38%'
  }
}

const getLiveBrandLogoBounds = (exportImage) => {
  const liveRoot = getOfficerCardElement()
  if (!liveRoot || !(exportImage instanceof HTMLImageElement)) {
    return null
  }

  const selector = exportImage.classList.contains('horizontal-officer-card__brand-logo-image')
    ? '.horizontal-officer-card__brand-logo-image'
    : '.officer-card-brand__logo-image'
  const liveImage = liveRoot.querySelector(selector)

  if (!(liveImage instanceof HTMLImageElement)) {
    return null
  }

  const rect = liveImage.getBoundingClientRect()
  const width = Math.round(rect.width)
  const height = Math.round(rect.height)

  if (width < 2 || height < 2) {
    return null
  }

  return { width, height }
}

const getBrandLogoExportBounds = (logoImg) => {
  const liveBounds = getLiveBrandLogoBounds(logoImg)
  if (liveBounds) {
    return liveBounds
  }

  if (logoImg.classList.contains('horizontal-officer-card__brand-logo-image')) {
    return { width: 48, height: 48 }
  }

  const height = 46
  const aspectRatio = logoImg.naturalWidth > 0 && logoImg.naturalHeight > 0
    ? logoImg.naturalWidth / logoImg.naturalHeight
    : 1

  return {
    width: Math.max(1, Math.round(height * aspectRatio)),
    height
  }
}

const rasterizeBrandLogoImageForCanvasExport = async (logoImg) => {
  if (!(logoImg instanceof HTMLImageElement)) {
    return
  }

  await waitForImageElement(logoImg)

  if (!logoImg.naturalWidth || !logoImg.naturalHeight) {
    return
  }

  const { width: boxW, height: boxH } = getBrandLogoExportBounds(logoImg)
  const scale = Math.min(boxW / logoImg.naturalWidth, boxH / logoImg.naturalHeight)
  const drawW = logoImg.naturalWidth * scale
  const drawH = logoImg.naturalHeight * scale
  const offsetX = (boxW - drawW) / 2
  const offsetY = (boxH - drawH) / 2

  const canvas = document.createElement('canvas')
  canvas.width = boxW
  canvas.height = boxH
  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  context.clearRect(0, 0, boxW, boxH)
  context.drawImage(logoImg, offsetX, offsetY, drawW, drawH)

  logoImg.src = canvas.toDataURL('image/png')
  logoImg.removeAttribute('srcset')
  logoImg.style.width = `${boxW}px`
  logoImg.style.height = `${boxH}px`
  logoImg.style.maxWidth = `${boxW}px`
  logoImg.style.maxHeight = `${boxH}px`
  logoImg.style.minWidth = `${boxW}px`
  logoImg.style.minHeight = `${boxH}px`
  logoImg.style.objectFit = 'fill'
  logoImg.style.objectPosition = 'center center'
  logoImg.style.display = 'block'
  logoImg.style.flexShrink = '0'
}

const rasterizeBrandLogoImagesForCanvasExport = async (root) => {
  const logos = Array.from(root.querySelectorAll('.officer-card-brand__logo-image, .horizontal-officer-card__brand-logo-image'))
  await Promise.all(logos.map((logo) => rasterizeBrandLogoImageForCanvasExport(logo)))
}

const ensureOfficerCardAssets = async (root, officer) => {
  if (!root || !officer) {
    return
  }

  const photo = root.querySelector('.card-photo, .horizontal-officer-card__photo')
  const photoSource = officer.image || officerCardFallbackImage(officer)

  if (photo instanceof HTMLImageElement && photoSource) {
    const photoDataUrl = await loadImageAsDataUrl(photoSource)
    if (photoDataUrl) {
      photo.src = photoDataUrl
      photo.removeAttribute('srcset')
    }
  }

  const stampDataUrl = await loadImageAsDataUrl('/stamp.png')
  if (!stampDataUrl) {
    return
  }

  root.querySelectorAll('.officer-card-stamp').forEach((stamp) => {
    if (!(stamp instanceof HTMLImageElement) || stamp.src.startsWith('data:')) {
      return
    }

    stamp.src = stampDataUrl
    stamp.removeAttribute('srcset')
  })
}

const waitForImageElement = (image) => new Promise((resolve) => {
  if (!(image instanceof HTMLImageElement)) {
    resolve()
    return
  }

  if (image.complete && image.naturalWidth > 0) {
    resolve()
    return
  }

  image.addEventListener('load', resolve, { once: true })
  image.addEventListener('error', resolve, { once: true })
})

const resolveObjectPositionOffsets = (objectPosition, boxW, boxH, drawW, drawH) => {
  const tokens = `${objectPosition || '50% 50%'}`.trim().split(/\s+/)
  const horizontalToken = tokens[0] || '50%'
  const verticalToken = tokens.length > 1 ? tokens[1] : '50%'

  const resolveAxisOffset = (token, boxSize, drawSize) => {
    const normalized = token.trim().toLowerCase()

    if (normalized === 'left' || normalized === 'top') {
      return 0
    }

    if (normalized === 'right') {
      return boxSize - drawSize
    }

    if (normalized === 'bottom') {
      return boxSize - drawSize
    }

    if (normalized === 'center') {
      return (boxSize - drawSize) / 2
    }

    if (normalized.endsWith('%')) {
      const percent = Number.parseFloat(normalized)
      if (Number.isFinite(percent)) {
        return ((boxSize - drawSize) * percent) / 100
      }
    }

    const pixels = Number.parseFloat(normalized)
    if (Number.isFinite(pixels)) {
      return pixels
    }

    return (boxSize - drawSize) / 2
  }

  return {
    x: resolveAxisOffset(horizontalToken, boxW, drawW),
    y: resolveAxisOffset(verticalToken, boxH, drawH)
  }
}

const rasterizeOfficerCardStampForCanvasExport = async (stampImg) => {
  if (!(stampImg instanceof HTMLImageElement)) {
    return
  }

  await waitForImageElement(stampImg)

  if (!stampImg.naturalWidth || !stampImg.naturalHeight) {
    return
  }

  const computed = window.getComputedStyle(stampImg)
  const rect = stampImg.getBoundingClientRect()
  const boxW = Math.max(1, Math.round(rect.width))
  const boxH = Math.max(1, Math.round(rect.height))

  if (boxW < 2 || boxH < 2) {
    return
  }

  const opacity = Number.parseFloat(computed.opacity)
  const objectFit = computed.objectFit || 'contain'
  const objectPosition = computed.objectPosition || '50% 50%'

  let drawW = boxW
  let drawH = boxH
  let offsetX = 0
  let offsetY = 0

  if (objectFit === 'contain' || objectFit === 'scale-down') {
    const scale = Math.min(boxW / stampImg.naturalWidth, boxH / stampImg.naturalHeight)
    drawW = stampImg.naturalWidth * scale
    drawH = stampImg.naturalHeight * scale
    const offsets = resolveObjectPositionOffsets(objectPosition, boxW, boxH, drawW, drawH)
    offsetX = offsets.x
    offsetY = offsets.y
  }

  const canvas = document.createElement('canvas')
  canvas.width = boxW
  canvas.height = boxH
  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  context.clearRect(0, 0, boxW, boxH)
  context.globalAlpha = Number.isFinite(opacity) ? opacity : 1
  context.drawImage(stampImg, offsetX, offsetY, drawW, drawH)

  stampImg.src = canvas.toDataURL('image/png')
  stampImg.removeAttribute('srcset')
  stampImg.style.width = `${boxW}px`
  stampImg.style.height = `${boxH}px`
  stampImg.style.maxWidth = `${boxW}px`
  stampImg.style.maxHeight = `${boxH}px`
  stampImg.style.minWidth = `${boxW}px`
  stampImg.style.minHeight = `${boxH}px`
  stampImg.style.objectFit = 'fill'
  stampImg.style.objectPosition = 'center center'
  stampImg.style.opacity = '1'

  const wrap = stampImg.closest('.officer-card-stamp-wrap')
  if (wrap instanceof HTMLElement) {
    const wrapRect = wrap.getBoundingClientRect()
    const wrapW = Math.max(1, Math.round(wrapRect.width))
    const wrapH = Math.max(1, Math.round(wrapRect.height))

    wrap.style.width = `${wrapW}px`
    wrap.style.height = `${wrapH}px`
    wrap.style.minWidth = `${wrapW}px`
    wrap.style.minHeight = `${wrapH}px`
    wrap.style.flex = '0 0 auto'
    wrap.style.display = 'flex'
    wrap.style.alignItems = 'flex-end'
    wrap.style.justifyContent = 'flex-end'
  }
}

const rasterizeOfficerCardStampsForCanvasExport = async (root) => {
  const stamps = Array.from(root.querySelectorAll('.officer-card-stamp'))
  await Promise.all(stamps.map((stamp) => rasterizeOfficerCardStampForCanvasExport(stamp)))
}

const embedSnapshotBackgroundImages = async (root) => {
  const elements = [root, ...root.querySelectorAll('*')]

  await Promise.all(elements.map(async (element) => {
    if (!(element instanceof HTMLElement)) {
      return
    }

    const backgroundImage = window.getComputedStyle(element).backgroundImage
    if (!backgroundImage || backgroundImage === 'none') {
      return
    }

    const matches = [...backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g)]
    if (!matches.length) {
      return
    }

    let nextBackground = backgroundImage

    for (const match of matches) {
      const dataUrl = await loadImageAsDataUrl(match[1])
      if (dataUrl) {
        nextBackground = nextBackground.replace(match[0], `url("${dataUrl}")`)
      }
    }

    if (nextBackground !== backgroundImage) {
      element.style.backgroundImage = nextBackground
    }
  }))
}

const prepareOfficerCardExportRoot = async (root, officer = null) => {
  const exportOfficer = officer || selectedOfficer.value

  await ensureOfficerCardAssets(root, exportOfficer)
  await ensureOfficerCardBrandLogos(root)
  await embedSnapshotImages(root)
  await embedSnapshotBackgroundImages(root)
  replaceCanvasElementsWithImages(root)
  await waitForImages(root)
  await waitForRenderFrame()
}

const buildOfficerCardExportShellHtml = (title = 'Officer Card') => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <style>
        ${OFFICER_CARD_FONT_CSS}

        html, body {
          margin: 0;
          padding: 0;
          background: #ffffff;
        }

        body {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 16px;
          box-sizing: border-box;
        }

        @page {
          margin: 0;
        }
      </style>
    </head>
    <body></body>
  </html>
`

const buildOfficerCardExportHtml = (cardOuterHtml, title = 'Officer Card') => {
  const shellHtml = buildOfficerCardExportShellHtml(title)
  return shellHtml.replace('</body>', `${cardOuterHtml}</body>`)
}

const replaceCanvasElementsWithImages = (root) => {
  root.querySelectorAll('canvas').forEach((canvas) => {
    if (!(canvas instanceof HTMLCanvasElement) || !canvas.width || !canvas.height) {
      return
    }

    const image = document.createElement('img')
    const bounds = canvas.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(canvas)

    image.src = canvas.toDataURL('image/png')
    image.alt = 'QR code'
    image.className = canvas.className
    image.setAttribute('style', canvas.getAttribute('style') || '')

    if (bounds.width > 0) {
      image.style.width = `${Math.ceil(bounds.width)}px`
    } else if (computedStyle.width && computedStyle.width !== 'auto') {
      image.style.width = computedStyle.width
    }

    if (bounds.height > 0) {
      image.style.height = `${Math.ceil(bounds.height)}px`
    } else if (computedStyle.height && computedStyle.height !== 'auto') {
      image.style.height = computedStyle.height
    }

    image.style.display = computedStyle.display === 'inline' ? 'block' : computedStyle.display
    image.style.boxSizing = computedStyle.boxSizing
    image.style.padding = computedStyle.padding
    image.style.border = computedStyle.border
    image.style.borderRadius = computedStyle.borderRadius
    image.style.background = computedStyle.background
    image.style.imageRendering = 'pixelated'

    canvas.replaceWith(image)
  })
}

const cloneElementWithInlineStyles = (sourceElement) => {
  const clone = sourceElement.cloneNode(true)
  const sourceElements = [sourceElement, ...sourceElement.querySelectorAll('*')]
  const clonedElements = [clone, ...clone.querySelectorAll('*')]

  sourceElements.forEach((element, index) => {
    const clonedElement = clonedElements[index]

    if (!(clonedElement instanceof HTMLElement || clonedElement instanceof SVGElement)) {
      return
    }

    copyComputedStyles(element, clonedElement)
  })

  syncCanvasElements(sourceElement, clone)

  const rect = sourceElement.getBoundingClientRect()
  clone.style.margin = '0'
  clone.style.width = `${Math.ceil(rect.width)}px`
  clone.style.height = `${Math.ceil(rect.height)}px`
  clone.style.maxWidth = 'none'

  return {
    clone,
    width: Math.ceil(rect.width),
    height: Math.ceil(rect.height)
  }
}

const waitForImages = (target) => {
  const images = target instanceof Document
    ? Array.from(target.images || [])
    : Array.from(target.querySelectorAll('img'))

  if (!images.length) {
    return Promise.resolve()
  }

  return Promise.all(
    images.map((image) => new Promise((resolve) => {
      if (image.complete) {
        resolve()
        return
      }

      image.addEventListener('load', resolve, { once: true })
      image.addEventListener('error', resolve, { once: true })
    }))
  )
}

const waitForRenderFrame = () => {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve)
    })
  })
}

const canvasHasVisibleContent = (canvas) => {
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) {
    return false
  }

  const { width, height } = canvas
  if (!width || !height) {
    return false
  }

  const sampleColumns = 24
  const sampleRows = 24
  const sampleWidth = Math.min(width, sampleColumns)
  const sampleHeight = Math.min(height, sampleRows)
  const stepX = Math.max(1, Math.floor(width / sampleWidth))
  const stepY = Math.max(1, Math.floor(height / sampleHeight))
  const pixels = context.getImageData(0, 0, width, height).data

  for (let y = 0; y < height; y += stepY) {
    for (let x = 0; x < width; x += stepX) {
      const offset = ((y * width) + x) * 4
      const alpha = pixels[offset + 3]

      if (!alpha) {
        continue
      }

      const red = pixels[offset]
      const green = pixels[offset + 1]
      const blue = pixels[offset + 2]

      if (alpha < 255 || red < 250 || green < 250 || blue < 250) {
        return true
      }
    }
  }

  return false
}

const waitForOfficerCardQrCode = async (element) => {
  const maxAttempts = 24

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const canvas = element?.querySelector('.officer-card-qr-wrap canvas, canvas.officer-card-qr')
    if (canvas instanceof HTMLCanvasElement && canvasHasVisibleContent(canvas)) {
      return
    }

    await waitForRenderFrame()
  }
}

const createOfficerCardSnapshot = async () => {
  await nextTick()

  const element = getOfficerCardElement()
  if (!element) {
    return null
  }

  await waitForOfficerCardQrCode(element)
  await waitForImages(element)

  if (selectedOfficer.value) {
    await ensureOfficerCardAssets(element, selectedOfficer.value)
    await ensureOfficerCardBrandLogos(element)
    await embedSnapshotBackgroundImages(element)
    await waitForImages(element)
  }

  const snapshotHost = document.createElement('div')
  snapshotHost.style.position = 'fixed'
  snapshotHost.style.left = '-10000px'
  snapshotHost.style.top = '0'
  snapshotHost.style.zIndex = '-1'
  snapshotHost.style.pointerEvents = 'none'
  snapshotHost.style.background = '#ffffff'
  snapshotHost.style.padding = '0'
  snapshotHost.style.margin = '0'

  const snapshot = cloneElementWithInlineStyles(element)
  snapshotHost.appendChild(snapshot.clone)
  document.body.appendChild(snapshotHost)

  await waitForImages(snapshotHost)
  if (document.fonts?.ready) {
    await document.fonts.ready
  }
  await waitForRenderFrame()

  return {
    ...snapshot,
    host: snapshotHost,
    cleanup: () => {
      snapshotHost.remove()
    }
  }
}

const printOfficerCard = async () => {
  const snapshot = await createOfficerCardSnapshot()
  if (!snapshot) {
    window.alert('រកមិនឃើញកាតមន្ត្រីសម្រាប់បោះពុម្ព។')
    return
  }

  const printWindow = window.open('', '_blank', 'width=1200,height=900,scrollbars=yes')
  if (!printWindow) {
    snapshot.cleanup()
    window.alert('មិនអាចបើកផ្ទាំងបោះពុម្ពបានទេ។ សូមអនុញ្ញាត pop-up ជាមុន។')
    return
  }

  await prepareOfficerCardExportRoot(snapshot.clone, selectedOfficer.value)

  printWindow.document.open()
  printWindow.document.write(buildOfficerCardExportHtml(snapshot.clone.outerHTML, getOfficerCardFileName()))
  printWindow.document.close()

  await waitForImages(printWindow.document)
  if (printWindow.document.fonts?.ready) {
    await printWindow.document.fonts.ready
  }

  snapshot.cleanup()

  printWindow.focus()
  printWindow.onafterprint = () => {
    printWindow.close()
  }

  window.setTimeout(() => {
    printWindow.print()
  }, 150)
}

const getOfficerCardExportTarget = (root) => (
  root.querySelector('#officerCardToPrint')
  || root.querySelector('.officer-card-page')
  || root
)

const assertEmbeddedExportImages = async (root) => {
  const pendingImages = Array.from(root.querySelectorAll('img')).filter((image) => {
    const source = image.currentSrc || image.getAttribute('src') || image.src || ''
    return source && !source.startsWith('data:')
  })

  if (pendingImages.length) {
    await embedSnapshotImages(root)
    await waitForImages(root)
  }
}

const renderOfficerCardCanvas = async (element, { width, height } = {}) => {
  const scale = Math.max(window.devicePixelRatio || 1, 2)
  const baseOptions = {
    scale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    logging: false,
    removeContainer: true,
    imageTimeout: 15000,
    foreignObjectRendering: false,
    scrollX: 0,
    scrollY: 0
  }

  const sizedOptions = width > 0 && height > 0
    ? {
      ...baseOptions,
      width,
      height,
      windowWidth: width,
      windowHeight: height
    }
    : baseOptions

  try {
    return await html2canvas(element, sizedOptions)
  } catch (error) {
    console.warn('Sized officer card canvas export failed, retrying without fixed dimensions', error)
    return html2canvas(element, baseOptions)
  }
}

const downloadOfficerCard = async () => {
  const snapshot = await createOfficerCardSnapshot()
  if (!snapshot) {
    window.alert('រកមិនឃើញកាតមន្ត្រីសម្រាប់ទាញយក។')
    return
  }

  try {
    const cardRoot = getOfficerCardExportTarget(snapshot.clone)

    Object.assign(snapshot.host.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      opacity: '0.01',
      zIndex: '2147483646',
      pointerEvents: 'none',
      background: '#ffffff',
      padding: '16px',
      margin: '0'
    })

    await waitForRenderFrame()
    await prepareOfficerCardExportRoot(snapshot.clone, selectedOfficer.value)
    await assertEmbeddedExportImages(snapshot.clone)

    await waitForImages(snapshot.host)
    await waitForRenderFrame()
    await rasterizeOfficerCardStampsForCanvasExport(snapshot.clone)
    await rasterizeBrandLogoImagesForCanvasExport(snapshot.clone)
    await waitForImages(snapshot.host)
    if (document.fonts?.ready) {
      await document.fonts.ready
    }
    await waitForRenderFrame()
    await waitForRenderFrame()

    const rect = cardRoot.getBoundingClientRect()
    const exportWidth = Math.max(Math.ceil(rect.width), 360)
    const exportHeight = Math.max(Math.ceil(rect.height), 560)

    const canvas = await renderOfficerCardCanvas(cardRoot, {
      width: exportWidth,
      height: exportHeight
    })

    if (!canvasHasVisibleContent(canvas)) {
      throw new Error('Officer card export produced a blank image')
    }

    const scale = Math.max(window.devicePixelRatio || 1, 2)
    const imageData = canvas.toDataURL('image/png')
    const pdfWidth = Math.max(Math.ceil(canvas.width / scale), exportWidth)
    const pdfHeight = Math.max(Math.ceil(canvas.height / scale), exportHeight)

    const pdf = new jsPDF({
      unit: 'px',
      format: [pdfWidth, pdfHeight],
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      compress: true
    })

    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST')
    pdf.save(`${getOfficerCardFileName()}.pdf`)
  } catch (error) {
    console.error('Failed to export officer card PDF', error)
    window.alert('មានបញ្ហាក្នុងការទាញយក PDF។ សូមសាកល្បងម្ដងទៀត។')
  } finally {
    snapshot.cleanup()
  }
}

onMounted(() => {
  fetchOfficers()
})
</script>

<style scoped>
.officer-stat-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.officer-add-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
}

.officer-add-btn svg {
  width: 18px;
  height: 18px;
}

.officer-table-card {
  width: 100%;
}

.officer-table-wrap {
  overflow-x: auto;
}

.officer-table {
  min-width: 1450px;
}

.tbl_action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row_ac_w {
  display: flex;
  gap: 0.5rem;
}

.row_ac_in {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 0;
  width: auto;
  height: auto;
  padding: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  position: relative;
  border: 0;
}

.row_ac_in.edit {
  color: #2563eb;
}

.row_ac_in.delete {
  color: #ff4c51;
}

.row_ac_in.view {
  color: #0891b2;
}

.row_ac_in:hover {
  opacity: 0.8;
}

.ocm-tooltip {
  position: relative;
}

.ocm-tooltip .tip_txt {
  display: none;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #222;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
}

.ocm-tooltip:hover .tip_txt {
  display: block;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 10px 8px;
  vertical-align: middle;
}

th {
  background: #f3f4f6;
  white-space: nowrap;
}

tbody tr {
  transition: background 0.2s;
}

tbody tr:hover {
  background: #f9fafb;
}

.modal {
  z-index: 1000;
}

.officer-card-modal {
  position: relative;
  width: min(calc(100vw - 32px), 392px);
  padding: 58px 10px 10px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
}

.officer-card-modal--vertical {
  width: fit-content;
  max-width: calc(100vw - 32px);
  padding: 58px 8px 8px;
}

.officer-card-modal--horizontal {
  width: min(calc(100vw - 32px), 940px);
  padding: 58px 16px 16px;
}

.officer-card-toolbar {
  position: absolute;
  top: 10px;
  right: 14px;
  left: 14px;
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
}

.officer-card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  min-width: 170px;
}

.card-orientation-toggle {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border: 1px solid #d6deeb;
  border-radius: 999px;
  background: #f8fafc;
}

.card-orientation-toggle__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

.card-orientation-toggle__btn svg {
  width: 18px;
  height: 18px;
}

.card-orientation-toggle__btn--active {
  background: #ffffff;
  color: #2066d7;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.search_wrap {
  margin-bottom: 1rem;
}

.ocm_sort_search_bar {
  background: var(--ocm-app-bg);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid var(--ocm-app-border);
  flex-wrap: wrap;
}

.ocm_search_input {
  background: var(--ocm-app-bg);
  color: var(--ocm-input-color);
  border: 1px solid var(--ocm-input-border);
  border-radius: 0.375rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  min-width: 260px;
}

.ocm_search_input::placeholder {
  color: color-mix(in srgb, var(--ocm-input-color) 62%, transparent);
}

.ocm_search_input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-color: var(--ocm-input-shadow);
  box-shadow: 0 0 0 1px var(--ocm-input-shadow);
}

.ocm_search_btn,
.ocm_reset_btn {
  color: #fff;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  padding: 0.65rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.ocm_search_btn {
  background: #0721e3;
}

.ocm_search_btn:hover {
  background: #1a08e3;
}

.ocm_reset_btn {
  background: #6b7280;
}

.ocm_reset_btn:hover {
  background: #4b5563;
}

:global(body.ocm_dark_skin) .search_wrap {
  margin-bottom: 1rem;
}

:global(body.ocm_dark_skin) .ocm_sort_search_bar {
  background: var(--ocm-app-bg);
  border-color: var(--ocm-app-border);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

:global(body.ocm_dark_skin) .ocm_search_input {
  background: #252b3b;
  color: var(--ocm-input-color);
  border-color: #4a536c;
}

:global(body.ocm_dark_skin) .ocm_search_input::placeholder {
  color: rgba(255, 255, 255, 0.58);
}

:global(body.ocm_dark_skin) .ocm_search_btn {
  background: #1e40ff;
  border-color: #3353ff;
}

:global(body.ocm_dark_skin) .ocm_search_btn:hover {
  background: #3558ff;
}

:global(body.ocm_dark_skin) .ocm_reset_btn {
  background: #3d4558;
  border-color: #525d76;
  color: #f8fafc;
}

:global(body.ocm_dark_skin) .ocm_reset_btn:hover {
  background: #4a556d;
}

.modal-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 0;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  color: #222;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.modal-action-btn svg {
  width: 20px;
  height: 20px;
}

.modal-action-btn.print {
  color: #2563eb;
}

.modal-action-btn.download {
  color: #0891b2;
}

.modal-action-btn.close {
  color: #ff4c51;
}

.modal-action-btn:hover {
  background: #e0e7ef;
}

.officer-card-page {
  width: 100%;
  color: #111827;
}

.officer-card-page,
.officer-card-page * {
  font-family: 'Noto Sans Khmer', 'Khmer UI', 'Leelawadee UI', sans-serif !important;
  letter-spacing: 0 !important;
  word-spacing: 0;
  font-kerning: normal;
}

.officer-card-page .font-moul {
  font-family: 'KhmerMuol', 'Noto Sans Khmer', sans-serif !important;
  font-weight: 400;
}

.officer-card-page--vertical {
  width: fit-content;
  margin: 0 auto;
}

.officer-card-page--horizontal {
  width: 100%;
}

.officer-vertical-card {
  width: 360px;
  min-height: 560px;
  overflow: hidden;
  border-radius: 14px;
  box-sizing: border-box;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70% 70%;
  border: 1px solid #e5e7eb;
  color: #111827;
}

.officer-vertical-card__content {
  position: relative;
  z-index: 1;
  padding: 20px 24px 28px;
  box-sizing: border-box;
}

.officer-card-brand {
  text-align: center;
  margin-bottom: 14px;
}

.officer-card-brand__logo {
  width: 100%;
  height: 46px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.officer-card-brand__logo-image {
  display: block;
  width: auto;
  max-width: 100%;
  height: 46px;
  object-fit: contain;
}

.officer-card-brand__title {
  color: #ca8a04;
  font-size: 13px;
  margin-bottom: 4px;
}

.officer-card-brand__subtitle {
  color: #ca8a04;
  font-size: 12px;
}

.officer-card-photo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.officer-card-code {
  width: 100%;
  text-align: center;
  margin: 8px 0 12px;
  font-weight: 700;
  color: #111827;
}

.officer-card-meta {
  width: 100%;
  color: #111827;
}

.officer-card-meta td {
  color: #111827;
  line-height: 1.55;
}

.officer-card-meta td:first-child {
  width: 88px;
  font-weight: 700;
  color: #374151;
}

.officer-card-meta td:last-child {
  font-weight: 600;
  color: #111827;
}

.officer-card-stamp-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.officer-card-seal-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: nowrap;
}

.officer-card-seal-row--vertical {
  margin-top: 8px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
}

.officer-card-qr-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.officer-card-qr {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  padding: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  box-sizing: border-box;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.officer-card-qr--horizontal {
  padding: 4px;
}

.officer-card-qr-wrap--vertical {
  width: 132px;
  min-width: 132px;
  height: 132px;
}

.officer-card-stamp-wrap--vertical {
  width: 208px;
  min-width: 208px;
  height: 208px;
  align-items: flex-end;
  justify-content: flex-end;
}

.officer-card-qr-wrap--horizontal {
  width: 116px;
  min-width: 116px;
  height: 116px;
}

.officer-card-stamp-wrap--horizontal {
  width: 188px;
  min-width: 188px;
  height: 188px;
}

.officer-card-stamp {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.officer-card-stamp--vertical {
  opacity: 0.85;
  object-position: right bottom;
}

.horizontal-officer-card {
  width: 100%;
  max-width: 900px;
  min-height: 220px;
  margin: 0 auto;
  align-items: stretch;
}

.horizontal-officer-card__surface {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
  padding: 18px;
  box-sizing: border-box;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #111827;
}

.horizontal-officer-card__table {
  width: 100%;
}

.horizontal-officer-card__photo-cell {
  width: 180px;
  vertical-align: top;
}

.horizontal-officer-card__photo-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  color: #111827;
}

.horizontal-officer-card__photo {
  width: 112px;
  height: 128px;
  background: #fff;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #dbe3ef;
}

.horizontal-officer-card__info-cell {
  vertical-align: top;
}

.horizontal-officer-card__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.horizontal-officer-card__brand-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.horizontal-officer-card__brand-logo-image {
  display: block;
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.horizontal-officer-card__brand-title {
  color: #ca8a04;
  font-size: 14px;
}

.horizontal-officer-card__brand-subtitle {
  color: #64748b;
  font-size: 12px;
}

.horizontal-officer-card__inner-table td {
  padding: 6px 4px;
}

.horizontal-officer-card__small-text {
  font-size: 13px;
  color: #374151;
}

.horizontal-officer-card__bold {
  font-weight: 700;
  color: #111827;
}

.horizontal-officer-card__expire-cell {
  width: 180px;
}

.horizontal-officer-card__expire-text {
  font-size: 12px;
  line-height: 1.7;
  color: #374151;
}

.horizontal-officer-card__qr-cell {
  width: 116px;
}

.horizontal-officer-card__spacer-cell {
  width: 188px;
}

.officer-card-stamp--horizontal {
  opacity: 0.85;
}

.officer-avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.avatar-fallback {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7eb;
  color: #374151;
  font-weight: 700;
}

.name_primary {
  font-weight: 600;
  color: #111827;
}

.name_secondary {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.pagination_w {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.logs_pagination_bar {
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.nav_i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  cursor: pointer;
}

.nav_i svg {
  width: 14px;
  height: 14px;
}

.nav_i.page {
  min-width: 38px;
  padding: 0 10px;
}

.nav_i.current {
  background: #2066d7;
  border-color: #0c3be3;
  color: #fff;
}

.nav_i:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ocm_count {
  color: #6b7280;
  font-size: 14px;
}

.ocm_dt_empt {
  text-align: center;
  color: #6b7280;
  padding: 24px;
}

.card-photo {
  width: 120px;
  height: 140px;
  object-fit: cover;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
  background: white;
  padding: 4px;
}

@media (max-width: 1200px) {
  .officer-stat-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .officer-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .officer-card-modal,
  .officer-card-modal--horizontal {
    width: calc(100vw - 20px);
  }

  .officer-card-modal--vertical {
    width: calc(100vw - 20px);
    max-width: 376px;
  }

  .officer-vertical-card {
    width: min(360px, 100%);
  }

  .officer-card-toolbar {
    left: 12px;
    right: 12px;
    justify-content: space-between;
  }

  .officer-card-actions {
    position: static;
    margin-left: auto;
  }

  .horizontal-officer-card__photo-cell,
  .horizontal-officer-card__expire-cell,
  .horizontal-officer-card__qr-cell,
  .horizontal-officer-card__spacer-cell {
    display: block;
    width: 100%;
  }

  .horizontal-officer-card__brand {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 520px) {
  .officer-stat-grid {
    grid-template-columns: 1fr;
  }

  .officer-card-modal {
    padding-top: 96px;
  }

  .officer-vertical-card {
    min-height: 520px;
  }

  .officer-vertical-card__content {
    padding: 18px 18px 24px;
  }

  .card-orientation-toggle {
    width: 100%;
    justify-content: center;
  }

  .modal-action-btn {
    margin-right: 6px;
  }

  .ocm_search_input {
    min-width: 100%;
  }
}
</style>