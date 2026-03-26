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

                            <button
                              class="row_ac_in ocm-tooltip ocm-viewac view"
                              type="button"
                              title="មើលកាតមន្ត្រី"
                              @click="openOfficerCard(official)"
                            >
                              <span class="tip_txt">មើលកាត</span>
                              <span class="d-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                  <path fill="currentColor" d="M12 4.5c-7 0-10 7.5-10 7.5s3 7.5 10 7.5 10-7.5 10-7.5-3-7.5-10-7.5zm0 13c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
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
                  <div class="officer-card-brand__logo" :style="{ backgroundImage: `url('${ocmLogoUrl}')` }"></div>
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
                          <div class="horizontal-officer-card__brand-logo" :style="{ backgroundImage: `url('${ocmLogoUrl}')` }"></div>
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

const resolveImageUrl = (value) => {
  const source = typeof value === 'string' ? value.trim() : ''

  if (!source) {
    return ''
  }

  if (
    source.startsWith('http://') ||
    source.startsWith('https://') ||
    source.startsWith('data:') ||
    source.startsWith('blob:')
  ) {
    return source
  }

  const normalizedPath = source.startsWith('/') ? source : `/${source}`
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
  selectedOfficer.value = officer
  cardOrientation.value = 'vertical'
  showOfficerCard.value = true
}

const closeOfficerCard = () => {
  showOfficerCard.value = false
  cardOrientation.value = 'vertical'
  selectedOfficer.value = null
}

const getOfficerCardQrValue = (officer) => {
  if (!officer) {
    return ''
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

const getOfficerCardFileName = () => {
  const officerCode = selectedOfficer.value?.code || `officer-card-${selectedOfficer.value?.id || 'export'}`
  return `${officerCode}`.replace(/[^a-zA-Z0-9-_]+/g, '-')
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

const createOfficerCardSnapshot = async () => {
  await nextTick()

  const element = getOfficerCardElement()
  if (!element) {
    return null
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

  printWindow.document.open()
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${getOfficerCardFileName()}</title>
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
      <body>
        ${snapshot.clone.outerHTML}
      </body>
    </html>
  `)
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

const renderOfficerCardCanvas = async (element, snapshot) => {
  const baseOptions = {
    scale: Math.max(window.devicePixelRatio || 1, 2),
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: snapshot.width,
    height: snapshot.height,
    windowWidth: snapshot.width,
    windowHeight: snapshot.height,
    removeContainer: true,
    imageTimeout: 0
  }

  try {
    const foreignObjectCanvas = await html2canvas(element, {
      ...baseOptions,
      foreignObjectRendering: true
    })

    if (canvasHasVisibleContent(foreignObjectCanvas)) {
      return foreignObjectCanvas
    }

    console.warn('Foreign object rendering returned a blank officer card canvas; retrying with standard rendering')
  } catch (error) {
    console.warn('Falling back to canvas text rendering for officer card export', error)
  }

  return html2canvas(element, {
    ...baseOptions,
    foreignObjectRendering: false
  })
}

const downloadOfficerCard = async () => {
  const snapshot = await createOfficerCardSnapshot()
  if (!snapshot) {
    window.alert('រកមិនឃើញកាតមន្ត្រីសម្រាប់ទាញយក។')
    return
  }

  try {
    const canvas = await renderOfficerCardCanvas(snapshot.clone, snapshot)

    const pdf = new jsPDF({
      unit: 'px',
      format: [snapshot.width, snapshot.height],
      orientation: snapshot.width > snapshot.height ? 'landscape' : 'portrait'
    })

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, snapshot.width, snapshot.height)
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
  background: #f3f4f6;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: background 0.2s;
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
  background: #e0e7ef;
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
  background: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.ocm_search_input {
  background: #fff;
  color: #111827;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  min-width: 260px;
}

.ocm_search_btn,
.ocm_reset_btn {
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  padding: 0.65rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
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
}

.officer-card-meta {
  width: 100%;
}

.officer-card-meta td:first-child {
  width: 88px;
  font-weight: 700;
}

.officer-card-meta td:last-child {
  font-weight: 600;
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
}

.officer-card-qr-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.officer-card-qr {
  display: block;
  width: 50%;
  height: 50%;
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
  width: 156px;
  min-width: 156px;
  height: 156px;
}

.officer-card-qr-wrap--horizontal {
  width: 116px;
  min-width: 116px;
  height: 116px;
}

.officer-card-stamp-wrap--horizontal {
  width: 136px;
  min-width: 136px;
  height: 136px;
}

.officer-card-stamp {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.officer-card-stamp--vertical {
  opacity: 0.85;
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
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
}

.horizontal-officer-card__bold {
  font-weight: 700;
}

.horizontal-officer-card__expire-cell {
  width: 180px;
}

.horizontal-officer-card__expire-text {
  font-size: 12px;
  line-height: 1.7;
}

.horizontal-officer-card__qr-cell {
  width: 116px;
}

.horizontal-officer-card__spacer-cell {
  width: 136px;
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