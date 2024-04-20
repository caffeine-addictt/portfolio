const highlighter = ({ children }: { children: React.ReactNode }) => {
  return (
    <mark style={{ backgroundColor: 'yellow' }} className="font-bold">
      {children}
    </mark>
  );
};
export default highlighter;
