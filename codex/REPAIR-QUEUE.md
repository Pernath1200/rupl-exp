# Pisanie repair queue — full-sentence type items → cloze

**Locked by James, 2026-08-06 (dropdown session):**

- **The line: typed-whole answers may be at most 3 words.** 4+ words = convert to a cloze.
- **The blank = the unit's teaching point** (the pattern word the unit exists to teach: gdybym/że/którym/mógłby/robiłeś…). If an item contains no teaching-point word (pure recycled scaffold), blank the most load-bearing form and log it in the item's note.
- Format: `{"mode": "cloze", "frame": "Gdyby mama ___ czas, zrobiłaby obiad.", "answer": "miała", "prompt_en": …, "accepts": […]}` — engine support shipped (practice-grammar cloze branch). `frame` must contain exactly one `___`. `accepts` = genuine answer variants only.
- Prompts (`prompt_en`) stay as they are unless the blank makes them misleading.
- 3-word answers stay typed-whole (Co słychać? / w nowym domu are correct as-is). This queue lists 4+ only.
- After converting a pack: re-run the audit (tags unchanged, must stay 0 errors), verify no duplicate answers within the stage, tick the pack below and note the commit hash.

## Queue (routine: process up to 3 packs per run, BEFORE building new units)

- [x] `a1_hello` (data/grammar/blocks/a1_hello.json) — 2 item(s): #9 „To jest mój dom.”; #10 „To jest twoja książka.”
- [x] `a2_dat_chunks` (data/grammar/blocks/a2_dat_chunks.json) — 7 item(s): #3 „Podoba mi się ten film.”; #4 „Podoba mi się ta książka.”; #5 „Podoba mi się to miasto.”; #6 „Nie podoba mi się ten film.”; #7 „Smakuje mi ta kawa.”; #8 „Smakuje mi ta zupa.”; #9 „Smakuje mi ten chleb.”
- [x] `a2_directions_func` (data/grammar/blocks/a2_directions_func.json) — 3 item(s): #0 „Przepraszam, gdzie jest apteka?”; #6 „Proszę iść w lewo.”; #7 „Proszę iść w prawo.”
- [ ] `a2_imperative` (data/grammar/blocks/a2_imperative.json) — 1 item(s): #8 „Proszę mówić po polsku.”
- [ ] `a2_ordering_func` (data/grammar/blocks/a2_ordering_func.json) — 3 item(s): #0 „Czy jest wolny stolik?”; #1 „Czy ten stolik jest wolny?”; #11 „Czy mogę płacić kartą?”
- [ ] `a2_phone_func` (data/grammar/blocks/a2_phone_func.json) — 4 item(s): #2 „Czy mogę rozmawiać z mamą?”; #3 „Czy mogę rozmawiać z tatą?”; #4 „Czy mogę rozmawiać z siostrą?”; #5 „Nie mogę teraz rozmawiać.”
- [ ] `a2_shopping_func` (data/grammar/blocks/a2_shopping_func.json) — 1 item(s): #8 „Czy mogę płacić kartą?”
- [ ] `a2_smalltalk` (data/grammar/blocks/a2_smalltalk.json) — 2 item(s): #8 „Jak było w weekend?”; #11 „Jak było w pracy?”
- [ ] `a2_wrapup_func` (data/grammar/blocks/a2_wrapup_func.json) — 4 item(s): #2 „Czy jest wolny stolik?”; #3 „Czy mogę rozmawiać z siostrą?”; #4 „Jak było w weekend?”; #5 „Proszę iść w lewo.”
- [ ] `b1_polite` (data/grammar/blocks/b1_polite.json) — 8 item(s): #0 „Czy mógłby pan mi pomóc?”; #1 „Czy mogłaby pani mi pomóc?”; #2 „Czy mógłby pan mówić po angielsku?”; #3 „Czy mogłaby pani mówić po polsku?”; #4 „Czy mogłaby pani zrobić kawę?”; #5 „Chciałbym zapytać, gdzie jest bank.”; #6 „Chciałabym zapytać, gdzie jest apteka.”; #8 „Dziękuję bardzo za kawę.”
- [ ] `b1_stories_func` (data/grammar/blocks/b1_stories_func.json) — 1 item(s): #2 „Nic się nie stało.”
- [ ] `b1_vocative_chunks` (data/grammar/blocks/b1_vocative_chunks.json) — 5 item(s): #6 „Mamo, gdzie jest apteka?”; #7 „Tato, dziękuję za prezent!”; #8 „Babciu, jak się masz?”; #10 „Panie Piotrze, przepraszam, czy mógłby pan mi pomóc?”; #11 „Pani Anno, dziękuję bardzo!”
- [ ] `b1_wrapup` (data/grammar/blocks/b1_wrapup.json) — 3 item(s): #1 „Mamy termin w przyszłym tygodniu.”; #5 „Najpierw szedłem do banku.”; #7 „Spóźniłem się do pracy.”
- [ ] `b2_gdyby` (data/grammar/blocks/b2_gdyby.json) — 10 item(s): #0 „Gdybym miał pieniądze, kupiłbym samochód.”; #1 „Gdyby mama miała czas, zrobiłaby obiad.”; #2 „Gdybyś miał czas, zrobiłbyś obiad.”; #3 „Gdyby tata miał czas, zrobiłby kawę.”; #4 „Gdybym miał czas, chciałbym być w parku.”; #5 „Gdyby mama była w sklepie, kupiłaby chleb.”; #6 „Gdyby tata był w domu, mógłby pomóc.”; #7 „Gdybym był w Polsce, chciałbym mówić po polsku.”; #8 „Gdyby mama miała pieniądze, kupiłaby dom.”; #9 „Gdybyś miał pieniądze, chciałbyś nowy samochód.”
- [ ] `b2_indirect_q` (data/grammar/blocks/b2_indirect_q.json) — 10 item(s): #0 „Nie wiem, gdzie jest apteka.”; #1 „Nie wiem, czy sklep jest otwarty.”; #2 „Wiem, kiedy mama będzie w domu.”; #3 „Nie wiem, ile to kosztuje.”; #4 „Wiem, dlaczego tata jest zmęczony.”; #5 „Nie wiem, który film jest dobry.”; #6 „Nie wiem, kto to jest.”; #7 „Nie wiem, co tata robi.”; #8 „Nie wiem, z kim tata pracuje.”; #9 „Nie wiem, czy mama ma skierowanie.”
- [ ] `b2_jesli` (data/grammar/blocks/b2_jesli.json) — 10 item(s): #0 „Jeśli masz czas, zrobię obiad.”; #1 „Jeśli sklep jest otwarty, kupię chleb.”; #2 „Jeśli pogoda będzie ładna, będę w parku.”; #3 „Jeśli będzie zimno, będę w domu.”; #4 „Jeśli jesteś zmęczony, idź do domu.”; #5 „Jeśli masz pieniądze, kup bilet.”; #6 „Jeśli tata będzie w domu, przyjdę.”; #7 „Jeśli będziesz głodny, zrobię zupę.”; #8 „Jeśli mama będzie w pracy, tata zrobi obiad.”; #9 „Jeśli to jest dobra decyzja, będzie dobrze.”
- [ ] `b2_ktory_full` (data/grammar/blocks/b2_ktory_full.json) — 10 item(s): #0 „To jest film, o którym mówiłem.”; #1 „To jest książka, o której mówiłem.”; #2 „To jest kolega, z którym pracuję.”; #3 „To jest koleżanka, z którą pracuję.”; #4 „To jest dom, w którym mieszkam.”; #5 „To jest pies, którego mam.”; #6 „To jest brat, którego znasz.”; #7 „To jest autobus, którym jadę.”; #8 „To jest praca, o której mówiłem.”; #9 „To jest sklep, w którym kupuję chleb.”
- [ ] `b2_reported` (data/grammar/blocks/b2_reported.json) — 10 item(s): #0 „Tata powiedział, że sklep jest zamknięty.”; #1 „Mama powiedziała, że kawa jest dobra.”; #2 „Lekarz powiedział, że wyniki są dobre.”; #3 „Powiedziałem, że jestem zmęczony.”; #4 „Powiedziałam, że jestem zmęczona.”; #5 „Tata powiedział, że mama będzie w domu.”; #6 „Siostra powiedziała, że ma nowy samochód.”; #7 „Mama powiedziała, że pogoda będzie ładna.”; #8 „Lekarz powiedział, że mam skierowanie.”; #9 „Brat powiedział, że pracuje w biurze.”
- [ ] `b2_ze_clauses` (data/grammar/blocks/b2_ze_clauses.json) — 10 item(s): #0 „Wiem, że mama jest w domu.”; #1 „Myślę, że kawa jest dobra.”; #2 „Wiem, że tata pracuje.”; #3 „Myślę, że sklep jest zamknięty.”; #4 „Mama mówi, że pogoda jest ładna.”; #5 „Wiem, że brat jest zmęczony.”; #6 „Myślę, że to jest dobre.”; #7 „Wiem, że mam skierowanie.”; #8 „Myślę, że wyniki są dobre.”; #9 „Idę do sklepu, żeby kupić chleb.”

_19 packs · 104 items · generated 2026-08-06 by sweep (answers with ≥4 words, no existing gap fields)._

## Conversion log

- **2026-08-06, cloud routine (B2 batch 10):** `a1_hello` (2), `a2_dat_chunks` (7), `a2_directions_func` (3) — 12 items converted, audit 0 errors, no duplicate answers within any Pisanie stage. Two blanks did NOT land on the unit's teaching point and are logged per-item in an item `note`, per the queue's own fallback clause: `a1_hello` #9/#10 blank the possessive rather than `jest`, because items 2 and 6 already type `jest` whole and a third identical answer would break the no-duplicates rule. Everywhere else the blank is the teaching point: `a2_dat_chunks` blanks the plain-form noun (the subject-flip the unit exists for) and the front `Nie`; `a2_directions_func` blanks the unchanged place name and the direction word its own explain says is the only part that moves. Remaining: 16 packs, 92 items.
