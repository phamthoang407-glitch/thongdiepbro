import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Sparkles, RotateCcw } from "lucide-react";

const messages = [
  "Cảm ơn vì đã xuất hiện trong cuộc đời của anh 💗",
  "Mỗi ngày có em đều là một ngày thật đặc biệt 🌷",
  "Em chính là lý do khiến mình mỉm cười nhiều hơn 😊",
  "Mong rằng chúng ta sẽ cùng nhau tạo thêm thật nhiều kỷ niệm đẹp ✨",
  "Chỉ cần có em yêuuuuuuu bên cạnh, ngày bình thường cũng hóa tuyệt vời 💕",
  "Em yêuuuuuu là món quà dịu dàng nhất mà cuộc sống đã dành tặng anh 🎁",
  "Dù hôm nay thế nào, hãy nhớ rằng luôn có anh thương em 🌸",
  "Gửi em yêuuuuu của anh một cái ôm thật ấm áp từ trái tim này 🤗",
  "Anh rất may mắn vì được gặp và yêu thương em 💖",
  "Hy vọng nụ cười sẽ luôn ở trên môi của em yêuuuuu 🌹"
];

const heartData = [
  { x: -250, y: -150, size: 46, delay: 0 },
  { x: -145, y: -225, size: 34, delay: 0.06 },
  { x: 0, y: -245, size: 55, delay: 0.12 },
  { x: 155, y: -205, size: 39, delay: 0.18 },
  { x: 245, y: -115, size: 48, delay: 0.24 },
  { x: -270, y: 15, size: 37, delay: 0.3 },
  { x: 265, y: 40, size: 42, delay: 0.36 },
  { x: -205, y: 150, size: 50, delay: 0.42 },
  { x: -60, y: 220, size: 35, delay: 0.48 },
  { x: 105, y: 210, size: 52, delay: 0.54 },
  { x: 225, y: 150, size: 32, delay: 0.6 }
];

export default function LoveLetterPage() {
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const particles = useMemo(
    () => Array.from({ length: 22 }, (_, index) => ({
      id: index,
      left: `${(index * 17 + 9) % 100}%`,
      delay: `${(index % 7) * 0.7}s`,
      duration: `${5 + (index % 5)}s`,
      size: 8 + (index % 4) * 4
    })),
    []
  );

  function chooseMessage() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
  }

  function resetPage() {
    setOpened(false);
    setShowMessage(false);
    setMessage("");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 font-sans text-rose-950">
      <div className="absolute inset-0 opacity-60">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bottom-[-30px] text-rose-300"
            style={{ left: particle.left }}
            animate={{ y: [0, -900], opacity: [0, 0.8, 0], rotate: [0, 25, -20] }}
            transition={{ repeat: Infinity, delay: Number.parseFloat(particle.delay), duration: Number.parseFloat(particle.duration), ease: "linear" }}
          >
            <Heart size={particle.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7"
        >
          <div className="mb-3 flex items-center justify-center gap-2 text-rose-500">
            <Sparkles size={20} />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">Gửi người thương</span>
            <Sparkles size={20} />
          </div>
          <h1 className="font-serif text-4xl font-bold text-rose-800 sm:text-6xl">
            Có một điều mình muốn nói...
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-700/80 sm:text-lg">
            Hãy mở bức thư nhỏ này và chọn một trái tim nhé!
          </p>
        </motion.div>

        <div className="relative flex h-[510px] w-full max-w-[650px] items-center justify-center sm:h-[560px]">
          <AnimatePresence>
            {opened && heartData.map((heart, index) => (
              <motion.button
                key={index}
                type="button"
                aria-label={`Mở thông điệp số ${index + 1}`}
                className="absolute z-20 cursor-pointer text-rose-500 drop-shadow-lg transition hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300/60 rounded-full"
                initial={{ x: 0, y: 30, scale: 0, opacity: 0 }}
                animate={{ x: heart.x, y: heart.y, scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: heart.delay, type: "spring", stiffness: 180, damping: 14 }}
                whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0] }}
                whileTap={{ scale: 0.85 }}
                onClick={chooseMessage}
              >
                <Heart size={heart.size} fill="currentColor" />
              </motion.button>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setOpened(true)}
            disabled={opened}
            className="relative z-10 h-48 w-72 cursor-pointer rounded-2xl border border-white/70 bg-white/65 shadow-2xl shadow-rose-300/40 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-rose-300 disabled:cursor-default sm:h-52 sm:w-80"
            whileHover={!opened ? { scale: 1.04, rotate: -1 } : {}}
            whileTap={!opened ? { scale: 0.97 } : {}}
            animate={opened ? { y: 45, scale: 0.86, opacity: 0.82 } : { y: 0, scale: 1 }}
          >
            <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-2xl">
              <motion.div
                className="absolute -top-28 left-1/2 h-52 w-52 -translate-x-1/2 rotate-45 border border-rose-200 bg-gradient-to-br from-rose-100 to-pink-200"
                animate={opened ? { rotateX: 150, y: -60 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-rose-500 p-4 text-white shadow-lg shadow-rose-300">
                {opened ? <Heart size={30} fill="currentColor" /> : <Mail size={30} />}
              </div>
              <span className="font-serif text-xl font-bold text-rose-800">
                {opened ? "Hãy chọn một trái tim" : "Nhấn để mở thư"}
              </span>
            </div>
          </motion.button>
        </div>

        {opened && (
          <button
            type="button"
            onClick={resetPage}
            className="mt-1 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-rose-700 shadow-sm backdrop-blur transition hover:bg-white"
          >
            <RotateCcw size={17} /> Xem lại từ đầu
          </button>
        )}
      </section>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/25 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessage(false)}
          >
            <motion.article
              className="relative w-full max-w-md rounded-[2rem] border border-white bg-gradient-to-br from-white to-rose-50 p-8 text-center shadow-2xl"
              initial={{ scale: 0.6, y: 60, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 170, damping: 16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <Heart size={34} fill="currentColor" />
              </div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-rose-800">Thông điệp dành cho bạn</h2>
              <p className="text-lg leading-8 text-rose-700">{message}</p>
              <button
                type="button"
                onClick={() => setShowMessage(false)}
                className="mt-7 rounded-full bg-rose-500 px-7 py-3 font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600"
              >
                Nhận yêu thương
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}